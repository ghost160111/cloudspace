import { PureComponent, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

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

class Layout extends PureComponent {
    render(): ReactNode {
        return (
            <BrowserRouter>
                <AuthMiddleware />
                <Auth>
                    <Sidebar store={leftSidebarStore} position="left" hideToggleBtn>
                        Left side bar
                    </Sidebar>
                </Auth>
                <div className={styles["app-wrap"]}>
                    <Auth>
                        <Header />
                    </Auth>
                    <Main />
                    <Auth>
                        <Footer />
                    </Auth>
                </div>
                <Auth>
                    <Sidebar store={rightSidebarStore} position="right" hideToggleBtn>
                        Right side bar
                    </Sidebar>
                </Auth>
            </BrowserRouter>
        );
    }
}

export default Layout;
