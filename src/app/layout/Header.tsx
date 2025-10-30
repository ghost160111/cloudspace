import NavigationLink from "components/Link/NavigationLink";
import { PureComponent, ReactNode } from "react";
import styles from "./Header.module.scss";

class Header extends PureComponent {
    render(): ReactNode {
        return (
            <header className={styles["header"]}>
                <nav>
                    <ul>
                        <li>
                            <NavigationLink to="/">Home</NavigationLink>
                        </li>
                        <li>
                            <NavigationLink to="/about">About</NavigationLink>
                        </li>
                        <li>
                            <NavigationLink to="/contact">Contact</NavigationLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
