import { title } from "decorators/title";
import { Component, ReactNode } from "react";

@title(() => ({
    title: "Servers",
}))
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
