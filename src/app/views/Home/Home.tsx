import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";
import { title } from "decorators/title";
import ActionButton from "components/Buttons/ActionButton";

@title(() => ({
    title: "Servers",
}))
@mobx
class Home extends Component {
    render(): ReactNode {
        return (
            <div style={{ height: "100dvh" }}>
                <h1>Servers</h1>
                <ActionButton type="button" onClick={() => this.store.authStore.logout()}>
                    Logout
                </ActionButton>
            </div>
        );
    }
}

export default Home;
