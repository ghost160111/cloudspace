import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";
import { title } from "decorators/title";

@title(() => ({
    title: "Servers",
}))
@mobx
class Home extends Component {
    render(): ReactNode {
        return (
            <div style={{ height: "100dvh" }}>
                <h1>Servers</h1>
                <button onClick={() => this.store.authStore.logout()}>Logout</button>
            </div>
        );
    }
}

export default Home;
