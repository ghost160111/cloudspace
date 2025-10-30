import { IReactionDisposer, reaction } from "mobx";
import { Component } from "react";
import { T_Keys } from "stores/RootStore";
import { setComponentName } from "utils/functions/setComponentName";

/** Uses `@mobx` decorator underhood for reactivity purposes, don't use `@mobx` decorator with this decorator, it will through errors! */
export function title<T extends { new (...args: any[]): Component }>(
    optionsFn: (self: InstanceType<T>) => {
        title: string | { key: string };
        locales?: Record<string, string>;
        localeIndexes?: Record<string, T_Keys>;
        useLocaleIndexes?: boolean;
    },
) {
    return function (Target: T) {
        class Title extends Target {
            disposeReaction: IReactionDisposer;

            getOptionsTitle(title: string | { key: T_Keys }): string {
                return typeof title === "string" ? title : this.store.localeStore.t(title.key);
            }

            componentDidMount(): void {
                this.disposeReaction = reaction(
                    () => [this.store.localeStore.lang, this.store.localeStore.langLoaded],
                    ([lang]) => {
                        const { t } = this.store.localeStore;
                        const options = optionsFn(this as InstanceType<T>);
                        if (options.useLocaleIndexes) {
                            const hasLocaleIndex: boolean = Boolean(options?.localeIndexes?.[lang]);
                            document.title = hasLocaleIndex
                                ? t(options?.localeIndexes?.[lang] as T_Keys)
                                : this.getOptionsTitle(options.title as T_Keys);
                        } else {
                            document.title =
                                options?.locales?.[lang] ??
                                this.getOptionsTitle(options.title as T_Keys) ??
                                t("loading");
                        }
                    },
                    { fireImmediately: true },
                );
                super.componentDidMount?.();
            }

            componentWillUnmount(): void {
                this.disposeReaction?.();
                super.componentWillUnmount?.();
            }
        }

        setComponentName(Title, Target, "Title");
        return Title;
    };
}
