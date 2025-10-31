import { mobx } from "decorators/mobx";
import { PropsWithChildren, Component, ReactNode } from "react";

@mobx
class Auth extends Component<PropsWithChildren> {
    render(): ReactNode {
        if (!this.store.authStore.authenticated) return null;
        return this.props.children;
    }
}

export default Auth;
