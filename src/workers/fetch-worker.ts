/*
  Typically you would need to use this worker for fetching and parsing large amounts of data to have consistent performance.
*/

let controller: AbortController | null = null;

const fetchData = async (url: string): Promise<void> => {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data from ${url}\n\nCause:\n${errorText}`);
        }

        const data = await response.json();
        self.postMessage({ response: data, status: "success" });
    } catch (err: any) {
        if (err.name === "AbortError") {
            self.postMessage({ status: "aborted" });
        } else {
            self.postMessage({ error: err.message, status: "failed" });
        }
    } finally {
        controller = null;
    }
};

let delayTimeout: ReturnType<typeof setTimeout>;

self.onmessage = async (evt: MessageEvent<{ command: string; url?: string; delay?: number; cancel?: boolean }>) => {
    const { command, url, delay, cancel } = evt.data;

    if (command === "terminate") {
        if (controller) controller.abort();
        if (delayTimeout) clearTimeout(delayTimeout);
        self.close();
        return;
    }

    if (cancel) {
        if (delayTimeout) clearTimeout(delayTimeout);
        if (controller && !controller.signal.aborted) controller.abort();
        return;
    }

    if (!url) return;

    if (delay && delay > 0) {
        if (delayTimeout) clearTimeout(delayTimeout);
        delayTimeout = setTimeout(() => fetchData(url), delay);
    } else {
        fetchData(url);
    }
};
