import { action, computed, makeObservable, observable } from "mobx";
import { IInitializable } from "types/mobx";
import { bound } from "decorators/bound";
import { Log } from "utils/functions/logger";
import { Cookies } from "utils/classes/Cookies";
import MobxStore from "./Abstracts";
import RootStore from "./RootStore";
import FetchStore from "./Fetch";

export const TOKEN_COOKIE_NAME = "access_token";

type LoginResponse = { access: string } | { error: string };

type AuthApiResponse = { access: string } | { error: string };

class AuthStore extends MobxStore implements IInitializable {
<<<<<<< HEAD
    fetcher: FetchStore<AuthApiResponse>;
=======
    fetcher: FetchStore<LoginResponse>;
>>>>>>> c6b62d227e750660c20c6d21e965ed447ed6dfbf

    @observable username: string = "";
    @observable password: string = "";
    @observable authenticated: boolean = false;

    constructor(rootStore: RootStore) {
        super(rootStore);

        this.fetcher = new FetchStore(null, {
            delay: 300,
            crossLoad: {
                key: "AUTH_STATE_TRIGGER",
                onCrossLoad: () => this.setAuthState(this.isAuthenticated),
            },
        });

        makeObservable(this);
    }

    @bound
    init(): void {
        if (this.isAuthenticated) {
            this.setAuthState(true);
        }
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
        this.fetcher.triggerCrossLoad();
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
                    Cookies.setCookie(TOKEN_COOKIE_NAME, data.access, 1);
                    this.setAuthState(true);
                    this.resetForm();
                    this.fetcher.triggerCrossLoad();
                }
            },
            onError: async (_, response) => {
                const { error } = await response.json();
                this.fetcher.errorMessage = error;
                this.fetcher.triggerCrossLoad();
            },
        });
    }
}

export default AuthStore;
