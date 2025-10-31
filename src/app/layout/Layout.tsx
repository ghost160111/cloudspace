import { Component, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { IReactionDisposer, reaction } from "mobx";
import { mobx } from "decorators/mobx";

import styles from "./Layout.module.scss";
import store from "stores/index";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarStore from "stores/Sidebar";
import AuthMiddleware from "./AuthMiddleware";
import Auth from "./Auth";

const leftSidebarStore = new SidebarStore(store, true);
const rightSidebarStore = new SidebarStore(store, true);

@mobx
class Layout extends Component {
    disposeReaction: IReactionDisposer;

    componentDidMount(): void {
        this.disposeReaction = reaction(
            () => this.store.authStore.authenticated,
            (authenticated) => {
                if (authenticated) {
                    leftSidebarStore.toggleSidebar(true);
                    rightSidebarStore.toggleSidebar(true);
                } else {
                    leftSidebarStore.toggleSidebar(false);
                    rightSidebarStore.toggleSidebar(false);
                }
            },
            { fireImmediately: true, delay: 500 },
        );
    }

    componentWillUnmount(): void {
        this.disposeReaction();
    }

    render(): ReactNode {
        return (
            <BrowserRouter>
                <AuthMiddleware />
                <Sidebar store={leftSidebarStore} position="left" hideToggleBtn>
                    <Auth>Left side bar</Auth>
                </Sidebar>
                <div className={styles["app-wrap"]}>
                    <Auth>
                        <Header />
                    </Auth>
                    <Main />
                    <Auth>
                        <Footer />
                    </Auth>
                </div>
                <Sidebar store={rightSidebarStore} position="right" hideToggleBtn>
                    <Auth>Right side bar</Auth>
                </Sidebar>
            </BrowserRouter>
        );
    }
}

export default Layout;
