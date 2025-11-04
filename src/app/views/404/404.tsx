import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";
import { title } from "decorators/title";

@title(() => ({
    title: "404",
}))
@mobx
class Error404 extends Component {
    render(): ReactNode {
        return (
            <>
                <h1>404</h1>
                <button onClick={() => this.store.authStore.logout()}>Logout</button>
            </>
        );
    }
}

export default Error404;
