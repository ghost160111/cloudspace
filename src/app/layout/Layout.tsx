import { PureComponent, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createPortal } from "react-dom";

import styles from "./Layout.module.scss";
import store from "stores/index";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarStore from "stores/Sidebar";
import LoadingLine from "components/Loaders/LoadingLine";

const leftSidebarStore = new SidebarStore(store, true);
const rightSidebarStore = new SidebarStore(store, true);

class Layout extends PureComponent {
    render(): ReactNode {
        return (
            <BrowserRouter>
                {createPortal(<LoadingLine />, document.body)}
                <Sidebar store={leftSidebarStore} position="left">
                    Left side bar
                </Sidebar>
                <div className={styles["app-wrap"]}>
                    <Header />
                    <Main />
                    <Footer />
                </div>
                <Sidebar store={rightSidebarStore} position="right">
                    Right side bar
                </Sidebar>
            </BrowserRouter>
        );
    }
}

export default Layout;
