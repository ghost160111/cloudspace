import { PureComponent, ReactNode } from "react";
import styles from "./Header.module.scss";
import NavLink from "components/Link/NavLink";

class Header extends PureComponent {
    render(): ReactNode {
        return (
            <header className={styles["header"]}>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={styles.link} activeClassName={styles.active}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={styles.link} activeClassName={styles.active}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={styles.link} activeClassName={styles.active}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
