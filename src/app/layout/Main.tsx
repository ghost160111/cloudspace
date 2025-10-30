import { Component, ReactNode } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { mobx } from "decorators/mobx";
import styles from "./Main.module.scss";

@mobx
class Main extends Component {
    render(): ReactNode {
        const { routes } = this.store.routerStore;
        return (
            <main className={styles["main"]}>
                <section>
                    <Routes>
                        {routes.map((route) => (
                            <Route {...route} />
                        ))}
                    </Routes>
                    <Outlet />
                </section>
            </main>
        );
    }
}

export default Main;
