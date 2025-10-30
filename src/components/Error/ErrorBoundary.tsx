import { PropsWithChildren, Component, ReactNode, ErrorInfo, CSSProperties } from "react";
import { bound } from "decorators/bound";
import { mobx } from "decorators/mobx";

interface Props extends PropsWithChildren {
    local?: boolean;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    error: boolean;
    tried: number;
}

const containerStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100dvh",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
};

@mobx
class ErrorBoundary extends Component<Props, State> {
    state: Readonly<State> = {
        error: false,
        tried: 0,
    };

    @bound
    reRunScript(): void {
        this.setState({ error: false });
    }

    @bound
    reloadPage(): void {
        location.reload();
    }

    @bound
    reloadBtnClick(): void {
        const reTryFn = this.props.local ? this.reRunScript : this.reloadPage;
        this.setState((prevState) => ({ tried: prevState.tried + 1 }));
        reTryFn();
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error: true }, () => {
            this.props.onError?.(error, errorInfo);
        });
    }

    render(): ReactNode {
        const { children, local } = this.props;

        if (!this.state.error) {
            return children;
        }

        const clickFn = local ? this.reRunScript : this.reloadPage;

        return (
            <div style={containerStyle}>
                <span className="mb-16">Something went wrong!</span>
                <button onClick={clickFn}>Reload view</button>
            </div>
        );
    }
}

export default ErrorBoundary;
