import { Component, ReactNode } from "react";
import { title } from "decorators/title";

@title(() => ({
    title: "404",
}))
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
