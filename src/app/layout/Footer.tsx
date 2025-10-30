import { PureComponent, ReactNode } from "react";
import styles from "./Footer.module.scss";

class Footer extends PureComponent {
    render(): ReactNode {
        return <footer className={styles["footer"]}>Footer</footer>;
    }
}

export default Footer;
