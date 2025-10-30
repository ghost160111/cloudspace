export function identifyBrowser(alertMessage?: boolean): string {
    const userAgent: string = navigator.userAgent.toLowerCase();
    let browserName: string = "";

    if (userAgent.includes("firefox")) {
        browserName = "Mozilla-based (Firefox)";
    } else if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
        browserName = "Chromium-based (Chrome)";
    } else if (userAgent.includes("edg")) {
        browserName = "Chromium-based (Edge)";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
        browserName = "WebKit-based (Safari)";
    } else if (userAgent.includes("opr")) {
        browserName = "Chromium-based (Opera)";
    } else {
        browserName = "Unknown browser";
    }

    if (alertMessage) alert(browserName);

    return browserName;
}

export function identifyBrowserAndDevice() {
    const userAgent: string = navigator.userAgent.toLowerCase();
    const browser: string = identifyBrowser();
    let device: string = "Desktop";

    if (
        /mobile|android|iphone|ipod|blackberry|opera mini|iemobile/.test(userAgent) &&
        !/tablet|ipad|playbook|kindle|silk/.test(userAgent)
    ) {
        device = "Mobile";
    } else if (
        /tablet|ipad|playbook|kindle|silk/.test(userAgent) ||
        (/android/.test(userAgent) && !/mobile/.test(userAgent))
    ) {
        device = "Tablet";
    }

    return { browser, device };
}
