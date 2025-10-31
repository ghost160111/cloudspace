import { action, computed, makeObservable, observable } from "mobx";
import { IInitializable } from "types/mobx";
import { bound } from "decorators/bound";
import { Log } from "utils/functions/logger";
import { Cookies } from "utils/classes/Cookies";
import MobxStore from "./Abstracts";
import RootStore from "./RootStore";
import FetchStore from "./Fetch";

export const TOKEN_COOKIE_NAME = "token";

class AuthStore extends MobxStore implements IInitializable {
    fetcher: FetchStore<{ access: string } | { error: string }>;

    @observable username: string = "";
    @observable password: string = "";
    @observable authenticated: boolean = false;

    constructor(rootStore: RootStore) {
        super(rootStore);
        this.fetcher = new FetchStore(null, {
            delay: 300,
        });
        makeObservable(this);
    }

    @computed
    get isAuthenticated(): boolean {
        const hasCookie: boolean = !!Cookies.getCookie(TOKEN_COOKIE_NAME);
        return hasCookie;
    }

    @computed
    get isDisabled(): boolean {
        const { loading } = this.fetcher;
        return loading || !this.username || !this.password;
    }

    init(): void {
        if (this.isAuthenticated) {
            this.setAuthState(true);
        }
    }

    @action.bound
    setUsername(username: string): void {
        this.username = username;
    }

    @action.bound
    setPassword(password: string): void {
        this.password = password;
    }

    @action.bound
    setAuthState(state: boolean): void {
        this.authenticated = state;
    }

    @action.bound
    resetForm(): void {
        this.username = "";
        this.password = "";
    }

    @bound
    logout(): void {
        Cookies.deleteCookie(TOKEN_COOKIE_NAME);
        this.setAuthState(false);
    }

    @bound
    login(): void {
        const url = new URL(this.rootStore.apiStore.get("/login")!);
        if (!url) {
            Log.APIError("No login endpoint found");
            return;
        }

        this.fetcher.fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: this.username, password: this.password }),
            onSuccess: (data) => {
                if (data && "access" in data) {
                    Cookies.setCookie(TOKEN_COOKIE_NAME, data.access, 1, 0, 0, 0);
                    this.setAuthState(true);
                    this.resetForm();
                }
            },
            onError: async (_, response) => {
                const { error } = await response.json();
                this.fetcher.errorMessage = error;
            },
        });
    }
}

export default AuthStore;
