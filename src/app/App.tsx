import "assets/fonts/golos-text/GolosText-Regular.ttf";
import "assets/fonts/golos-text/GolosText-Medium.ttf";
import "assets/fonts/golos-text/GolosText-Bold.ttf";
import "assets/styles/index.scss";
import "app/App.scss";

import { PureComponent, ReactNode } from "react";
import Layout from "app/layout/Layout";

class App extends PureComponent {
    render(): ReactNode {
        return <Layout />;
    }
}

export default App;
