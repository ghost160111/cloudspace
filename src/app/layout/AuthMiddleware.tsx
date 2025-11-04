import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";
import Navigate from "components/Link/Navigate";

@mobx
class AuthMiddleware extends Component {
    render(): ReactNode {
        if (!this.store.authStore.authenticated) {
            return <Navigate to="/login" />;
        } else if (this.store.authStore.authenticated && this.store.routerStore.withoutLangPathname === "/login") {
            return <Navigate to="/" />;
        }
    }
}

export default AuthMiddleware;
