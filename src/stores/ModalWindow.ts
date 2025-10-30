import { action, makeObservable, observable } from "mobx";
import { type RefObject, type ReactNode } from "react";
import { IInitializable } from "types/mobx";
import { bound } from "decorators/bound";
import MobxStore from "./Abstracts";
import RootStore from "./RootStore";

class ModalWindowStore extends MobxStore implements IInitializable {
    @observable isActive: boolean = false;
    @observable width: string = "fit-content";
    @observable height: string = "fit-content";
    @observable childrenTrigger: number = 0;
    @observable modalWindowRef: RefObject<HTMLDivElement | null> = observable.object({ current: null });

    children: ReactNode | null = null;

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this);
    }

    @bound
    init(): void {}

    @action.bound
    toggleWindow(v: boolean): void {
        if (v === this.isActive) return;
        this.isActive = v ?? !this.isActive;
    }

    @action.bound
    setWidth(width: number | string): void {
        this.width = typeof width === "number" ? `${width}px` : width;
    }

    @action.bound
    setHeight(height: number | string): void {
        this.height = typeof height === "number" ? `${height}px` : height;
    }

    @action.bound
    setChildren(children: ReactNode | null): void {
        this.children = children;
        this.childrenTrigger++;
    }

    @action.bound
    setModalWindowRef(ref: RefObject<HTMLDivElement | null>): void {
        this.modalWindowRef = ref;
    }
}

export default ModalWindowStore;
