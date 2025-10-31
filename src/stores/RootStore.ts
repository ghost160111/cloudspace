import { setupGlobalFetch } from "utils/functions/setupGlobalFetch";
import { DeepKeys } from "types/deep";
import type ru from "i18n/resources/ru.json";
import ConnectionStore from "./Connection";
import LoadingStore from "./Loading";
import LocaleStore from "./Locale";
import RouterStore from "./Router";
import ThemeStore from "./Theme";
import WindowStore from "./Window";
import FancyboxStore from "./Fancybox";
import ApiStore from "./Api";
import ModalWindowStore from "./ModalWindow";
import AuthStore from "./Auth";

export type T_Keys = DeepKeys<typeof ru>;

const stores = [
    AuthStore,
    ApiStore,
    ThemeStore,
    RouterStore,
    WindowStore,
    LoadingStore,
    FancyboxStore,
    LocaleStore<T_Keys>,
    ConnectionStore,
    ModalWindowStore,
];

class RootStore {
    authStore: AuthStore;
    apiStore: ApiStore;
    themeStore: ThemeStore;
    routerStore: RouterStore;
    windowStore: WindowStore;
    loadingStore: LoadingStore;
    fancyboxStore: FancyboxStore;
    localeStore: LocaleStore<T_Keys>;
    connectionStore: ConnectionStore;
    modalWindowStore: ModalWindowStore;

    constructor() {
        for (const StoreClass of stores) {
            const store = new StoreClass(this);
            const className = StoreClass.name;
            const loweredClassName = className.slice(0, 1).toLowerCase() + className.slice(1);
            this[loweredClassName] = store;
        }

        for (const [, store] of Object.entries(this)) {
            if (store !== undefined && "init" in store && typeof store.init === "function") {
                store.init();
            }
        }

        setupGlobalFetch(this);
    }
}

export default RootStore;
