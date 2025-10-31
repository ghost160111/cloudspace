import { action, makeObservable, observable, ObservableMap } from "mobx";
import { bound } from "decorators/bound";
import MobxStore from "./Abstracts";
import RootStore from "./RootStore";

const ORIGIN = import.meta.env.VITE_API_ORIGIN;

export type ApiMap =
    | "/login"
    | "/register"
    | "/change-password"
    | "/reset-password"
    | "/servers"
    | "/flavors"
    | "/images"
    | "/keypairs"
    | "/volumes"
    | "/volumes/backups"
    | "/volumes/snapshots"
    | "/network"
    | "/network/security-groups";

class ApiStore extends MobxStore {
    origin: string = ORIGIN;
    @observable api_map: ObservableMap<ApiMap, string> = observable.map([
        ["/login", "/user/login/"],
        ["/register", "/user/register/"],
        ["/change-password", "/user/change-password/"],
        ["/reset-password", "/user/reset-password/"],
        ["/servers", "/servers/"],
        ["/flavors", "/flavors/"],
        ["/images", "/images/"],
        ["/keypairs", "/servers/keypairs/"],
        ["/volumes", "/volumes/"],
        ["/volumes/backups", "/volumes/backups"],
        ["/volumes/snapshots", "/volumes/snapshots"],
        ["/network", "/network/"],
        ["/network/security-groups", "/network/security-groups/"],
    ]);

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this);
    }

    @bound
    get(endpoint: ApiMap, id?: number | string): string | null {
        let url = this.api_map.get(endpoint);
        if (url) {
            const api: string = `${ORIGIN}/api`;
            url = `${api}${url}${id ? id : ""}`;
        }

        return url ?? null;
    }

    @action.bound
    setApiMap(apiMap: ObservableMap<ApiMap, string>) {
        this.api_map = apiMap;
    }
}

export default ApiStore;
