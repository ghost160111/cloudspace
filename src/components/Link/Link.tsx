import { LinkProps, Link as RouterLink } from "react-router-dom";
import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";

@mobx
class Link extends Component<LinkProps> {
    render(): ReactNode {
        const { children, to, ...rest } = this.props;
        const { lang } = this.store.localeStore;
        const toUrl: string = `/${lang}${to === "/" ? "" : to}`;
        return (
            <RouterLink to={toUrl} {...rest}>
                {children}
            </RouterLink>
        );
    }
}

export default Link;
