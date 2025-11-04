import { PureComponent, ReactNode } from "react";
import styles from "./ActionButton.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

class ActionButton extends PureComponent<Props> {
    render(): ReactNode {
        const { children, className, ...rest } = this.props;
        return (
            <button className={`${styles["action-button"]} ${className}`} {...rest}>
                {children}
            </button>
        );
    }
}

export default ActionButton;
