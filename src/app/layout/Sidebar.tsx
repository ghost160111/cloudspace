import { PropsWithChildren, Component, ReactNode } from "react";
import { className } from "utils/functions/className";
import { mobx } from "decorators/mobx";
import styles from "./Sidebar.module.scss";
import SidebarStore from "stores/Sidebar";

interface Props extends PropsWithChildren {
    store: SidebarStore;
    position: "left" | "right";
}

@mobx
class Sidebar extends Component<Props> {
    get sidebarClass(): string {
        return className(styles.sidebar, {
            [styles["sidebar--active"]]: this.props.store.isActive,
            [styles["sidebar--right"]]: this.props.position === "right",
            [styles["sidebar--left"]]: this.props.position === "left",
        });
    }

    render(): ReactNode {
        return (
            <aside className={this.sidebarClass}>
                <button
                    type="button"
                    className={styles["toggle-button"]}
                    onClick={() => this.props.store.toggleSidebar()}
                >
                    Toggle
                </button>
                <div className={styles["content-wrap"]}>{this.props.children}</div>
            </aside>
        );
    }
}

export default Sidebar;
