import { action, makeObservable, observable, reaction } from "mobx";
import { IInitializable } from "types/mobx";
import { bound } from "decorators/bound";
import { theme } from "config/project.json";
import RootStore from "./RootStore";
import MobxStore from "./Abstracts";

export type Theme = "light" | "dark";

class ThemeStore extends MobxStore implements IInitializable {
    @observable theme: Theme = theme as Theme;
    @observable themes: Theme[] = ["light", "dark"];

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
