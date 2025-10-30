import { CSSProperties, PureComponent, ReactNode } from "react";
import { PropsWithClassName } from "types/react-types";
import { className } from "utils/functions/className";
import styles from "./CloseButton.module.scss";
import SVG_CloseIcon from "components/SVG/SVG_CloseIcon";

interface CloseButtonProps extends PropsWithClassName {
    position?: "absolute" | "fixed";
    alignX?: "left" | "right";
    alignY?: "top" | "bottom";
    style?: CSSProperties;
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

class CloseButton extends PureComponent<CloseButtonProps> {
    get closeButtonClassName(): string {
        const { position, alignX, alignY } = this.props;
        return className(styles["close-button"], {
            [this.getCloseBtnAlignClassName("left")]: alignX === "left",
            [this.getCloseBtnAlignClassName("right")]: alignX === "right",
            [this.getCloseBtnAlignClassName("bottom")]: alignY === "bottom",
            [this.getCloseBtnAlignClassName("top")]: alignY === "top",
            [this.getCloseBtnAlignClassName("absolute")]: position === "absolute",
            [this.getCloseBtnAlignClassName("fixed")]: position === "fixed",
            [this.props.className || ""]: Boolean(this.props.className),
        });
    }

    getCloseBtnAlignClassName(align: "left" | "right" | "top" | "bottom" | "absolute" | "fixed"): string {
        return styles[`close-button--${align}`];
    }

    render(): ReactNode {
        return (
            <button
                type="button"
                className={this.closeButtonClassName}
                style={this.props.style}
                onClick={this.props.onClick}
            >
                <SVG_CloseIcon className={styles["close-button__svg"]} />
            </button>
        );
    }
}

export default CloseButton;
