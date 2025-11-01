import "assets/fonts/golos-text/GolosText-Regular.ttf";
import "assets/fonts/golos-text/GolosText-Medium.ttf";
import "assets/fonts/golos-text/GolosText-Bold.ttf";
import "assets/styles/index.scss";
import "app/App.scss";

import { PureComponent, ReactNode } from "react";
import { createPortal } from "react-dom";

import Layout from "app/layout/Layout";
import LoadingLine from "components/Loaders/LoadingLine";
import InternetState from "components/Internet/InternetState";

class App extends PureComponent {
    render(): ReactNode {
        return (
            <>
                {createPortal(<LoadingLine />, document.body)}
                {createPortal(<InternetState />, document.body)}
                <Layout />
            </>
        );
    }
}

export default App;
