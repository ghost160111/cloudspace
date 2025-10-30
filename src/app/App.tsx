import "assets/fonts/golos-text/GolosText-Regular.ttf";
import "assets/fonts/golos-text/GolosText-Medium.ttf";
import "assets/fonts/golos-text/GolosText-Bold.ttf";
import "./App.scss";
import "assets/styles/index.scss";
import { PureComponent, ReactNode } from "react";
import Layout from "./layout/Layout";

class App extends PureComponent {
    render(): ReactNode {
        return <Layout />;
    }
}

export default App;
