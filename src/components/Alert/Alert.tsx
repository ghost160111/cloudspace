import { CSSProperties, PureComponent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { className } from "utils/functions/className";

import "./Alert.scss";
import CloseButton from "components/Buttons/CloseButton";
import SmoothResizable from "components/Containers/SmoothResizable";

const closeBtnStyles: CSSProperties = {
    top: "-0.25rem",
    right: "-0.25rem",
    zIndex: "1000",
};

interface Props {
    message: string;
    isOpen: boolean;
    toggleAlert?: () => void;
    local?: boolean;
    withWrap?: boolean;
    textAlign?: "left" | "center" | "right";
    animationDuration?: number;
    removeCloseBtn?: boolean;
}

interface State {
    isBlurred: boolean;
    canBeRemoved: boolean;
    shouldAnimate: boolean;
}

class Alert extends PureComponent<Props, State> {
    state: Readonly<State> = {
        isBlurred: false,
        canBeRemoved: this.props.isOpen,
        shouldAnimate: false,
    };

    private hideTimeout?: number;
    private animateTimeout?: number;

    get alertClassName(): string {
        return className("alert", {
            "alert--active": this.state.shouldAnimate,
        });
    }

    get alertWrapClassName(): string {
        return className("alert-wrap", {
            "alert-wrap--blurred": this.state.isBlurred,
        });
    }

    get alertContentClassName(): string {
        return className("alert-content", {
            "alert-content--center": this.props.textAlign === "center",
            "alert-content--right": this.props.textAlign === "right",
        });
    }

    handleHoverStart = (): void => this.setState({ isBlurred: true });
    handleHoverEnd = (): void => this.setState({ isBlurred: false });

    componentDidUpdate(prevProps: Props): void {
        const { isOpen, animationDuration = 300 } = this.props;

        if (isOpen && !prevProps.isOpen) {
            this.setState({ canBeRemoved: true, shouldAnimate: false }, () => {
                this.animateTimeout = window.setTimeout(() => {
                    this.setState({ shouldAnimate: true });
                }, 20);
            });
        }

        if (!isOpen && prevProps.isOpen) {
            this.setState({ shouldAnimate: false });
            this.hideTimeout = window.setTimeout(() => {
                this.setState({ canBeRemoved: false });
            }, animationDuration);
        }
    }

    componentWillUnmount(): void {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
        if (this.animateTimeout) clearTimeout(this.animateTimeout);
    }

    render(): ReactNode {
        const { message, local, toggleAlert, withWrap } = this.props;
        const { canBeRemoved } = this.state;

        if (!canBeRemoved) return null;

        const templateOrdinary: ReactNode = (
            <div
                className={this.alertClassName}
                onMouseEnter={this.handleHoverStart}
                onMouseLeave={this.handleHoverEnd}
                onTouchStart={this.handleHoverStart}
                onTouchEnd={this.handleHoverEnd}
                onTouchCancel={this.handleHoverEnd}
            >
                {!!toggleAlert && (
                    <CloseButton
                        position="absolute"
                        alignX="right"
                        alignY="top"
                        style={closeBtnStyles}
                        onClick={toggleAlert}
                    />
                )}
                <SmoothResizable>
                    <div className={this.alertContentClassName}>
                        <span>{message}</span>
                    </div>
                </SmoothResizable>
            </div>
        );

        const wrapper = withWrap ? <div className={this.alertWrapClassName}>{templateOrdinary}</div> : templateOrdinary;

        return local ? wrapper : createPortal(wrapper, document.body);
    }
}

export default Alert;
