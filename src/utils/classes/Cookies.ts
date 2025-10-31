export type OnAddCookieListener = (cookieName: string, newValue: string) => void;
export type OnDeleteCookieListener = (cookieName: string) => void;

export class CookieHandler {
    cookieChangeListener: ((oldValue: string, newValue: string) => void) | undefined;

    constructor(onCookieChange?: (oldValue: string, newValue: string) => void) {
        this.cookieChangeListener = onCookieChange;
    }

    get(target: Document, prop: string) {
        if (prop === "cookie") return Reflect.get(target, prop);
        return target[prop as keyof Document];
    }

    set(target: Document, prop: string, value: any) {
        if (prop === "cookie") {
            const oldValue: string = target[prop];
            if (this.cookieChangeListener) {
                this.cookieChangeListener(oldValue, value);
            }
        }
        return Reflect.set(target, prop, value);
    }
}

const cookieHandler: CookieHandler = new CookieHandler();
const proxiedDocument: Document = new Proxy(document, cookieHandler);

/**
 * Document cookies storage management class with set of methods that sets, gets and deletes cookies,
 * and also attaching listeners to when setting and deleting cookies.
 */
export class Cookies {
    static #onSetListeners: Set<OnAddCookieListener> = new Set();
    static #onDeleteListeners: Set<OnDeleteCookieListener> = new Set();

    static setCookie(
        name: string,
        value: string,
        days: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
    ): typeof Cookies {
        const date: Date = new Date();
        date.setTime(date.getTime() + days * (hours ?? 24) * (minutes ?? 60) * (seconds ?? 60) * 1000);
        const expires: string = "expires=" + date.toUTCString();
        proxiedDocument.cookie = `${name}=${value};${expires};path=/;SameSite=Strict;`; // doesn't keep the cookie when protocol is Http.
        this.#onSetListeners.forEach((listener) => listener(name, value));
        return this;
    }

    static getCookie(name: string): string | null {
        const splittedCookieList: string[] = proxiedDocument.cookie.split("; ");
        let foundValue: string = "";

        for (let i: number = 0; i < splittedCookieList.length; ++i) {
            const cookie: string = splittedCookieList[i];
            const splittedCookie: string[] = cookie.split("=");
            const cookieName: string = splittedCookie[0];
            const value: string = splittedCookie[1];

            if (cookieName === name) {
                foundValue = value;
                break;
            }
        }

        return foundValue;
    }

    static deleteCookie(name: string): typeof Cookies {
        proxiedDocument.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        this.#onDeleteListeners.forEach((listener) => listener(name));
        return this;
    }

    static addListener = (type: "add" | "delete", listener: OnAddCookieListener | OnDeleteCookieListener): void => {
        switch (type) {
            case "add":
                this.#onSetListeners.add(listener as OnAddCookieListener);
                break;
            case "delete":
                this.#onDeleteListeners.add(listener as OnDeleteCookieListener);
                break;
        }
    };

    static removeListener = (type: "add" | "delete", listener: OnDeleteCookieListener | OnAddCookieListener): void => {
        switch (type) {
            case "add":
                this.#onSetListeners.delete(listener as OnAddCookieListener);
                break;
            case "delete":
                this.#onDeleteListeners.delete(listener as OnDeleteCookieListener);
                break;
        }
    };

    static clearListeners = (): void => {
        this.#onSetListeners.clear();
        this.#onDeleteListeners.clear();
    };
}
