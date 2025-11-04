import { Component, ReactNode, RefObject } from "react";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { activeClassDetector } from "./utils";
import { mobx } from "decorators/mobx";

interface Props extends NavLinkProps {
    navRef?: RefObject<HTMLAnchorElement | null>;
    className?: string;
    activeClassName?: string;
}

@mobx
class NavLink extends Component<Props> {
    render(): ReactNode {
        const { to, navRef, children, className, activeClassName, ...rest } = this.props;
        const toUrl: string = `/${this.store.localeStore.lang}${to === "/" ? "" : to}`;

        return (
            <RouterNavLink
                to={toUrl}
                className={() => activeClassDetector(toUrl, className ?? "", activeClassName)}
                ref={navRef}
                {...rest}
            >
                {children}
            </RouterNavLink>
        );
    }
}

export default NavLink;
