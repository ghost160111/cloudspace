import { action, makeObservable, observable } from "mobx";
import RootStore from "stores/RootStore";
import MobxStore from "stores/Abstracts";

class SidebarStore extends MobxStore {
    @observable isActive: boolean = false;

    constructor(rootStore: RootStore, activeByDefault?: boolean) {
        super(rootStore);
        this.isActive = activeByDefault ?? false;
        makeObservable(this);
    }

    @action.bound
    toggleSidebar(isActive?: boolean): void {
        if (isActive === this.isActive) return;
        this.isActive = isActive ?? !this.isActive;
    }
}

export default SidebarStore;
