import { action, makeObservable, observable, reaction } from "mobx";
import { IInitializable } from "types/mobx";
import { bound } from "decorators/bound";
import RootStore from "./RootStore";
import MobxStore from "./Abstracts";

export type Theme = "default" | "grey";

class ThemeStore extends MobxStore implements IInitializable {
    @observable theme: Theme = "default";
    @observable themes: Theme[] = ["default", "grey"];

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this);
    }

    @bound
    init(): void {
        reaction(
            () => this.theme,
            (newTheme) => {
                document.documentElement.setAttribute("data-theme", newTheme);

                document.body.classList.forEach((className) => {
                    if (className.includes("theme")) {
                        document.body.classList.remove(className);
                    }
                });

                document.body.classList.add(`theme-${newTheme}`);
            },
            { fireImmediately: true },
        );
    }

    @action.bound
    setTheme(theme: Theme): void {
        this.theme = theme;
    }
}

export default ThemeStore;
