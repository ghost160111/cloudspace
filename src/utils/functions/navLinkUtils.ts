import { withoutLangPathname } from "./withoutLangPathname";
import { className } from "./className";

export interface NavLinkItem {
    to: string;
    className: string | (() => string);
    tKey?: string;
}

export function activeClassNameObserver(pathname: string, _className: string, activeClassName?: string): string {
    const pathWithoutLang: string = withoutLangPathname();
    return className(_className, {
        [activeClassName ?? "active"]: pathWithoutLang === pathname,
    });
}
