import { PureComponent } from "react";
import { setComponentName } from "utils/functions/setComponentName";

/**
 * Always place this decorator at the bottom of all decorators,
 * so that it is called first, and component name is correctly
 * shown in debug message on every component re-render!
 */
export function logRenders<T extends { new (...args: any[]): PureComponent }>(Target: T) {
    class LogRenders extends Target {
        componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
            super.componentDidUpdate?.(prevProps, prevState, snapshot);
            console.debug(
                "%cRe-rendered%c " + Target.name + "!",
                "color: white; background: green; padding: 2px 6px; border-radius: 3px 0 0 3px;",
                "color: black; background: yellow; padding: 2px 6px; border-radius: 0 3px 3px 0;",
            );
        }
    }

    setComponentName(LogRenders, Target, "LogRenders");
    return LogRenders;
}
