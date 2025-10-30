import "./Spinner.scss";
import { CSSProperties, PureComponent, ReactNode } from "react";

interface Props {
    fullsizeCentered?: boolean;
    style?: CSSProperties;
    onMounted?: () => void;
    onUnmounted?: () => void;
}

class Spinner extends PureComponent<Props> {
    componentDidMount(): void {
        this.props.onMounted?.();
    }

    componentWillUnmount(): void {
        this.props.onUnmounted?.();
    }

    render(): ReactNode {
        if (this.props.fullsizeCentered) {
            return (
                <div className="spinner-loader__fullsize-centered-wrapper" style={this.props.style}>
                    <div className="spinner-loader" />
                </div>
            );
        }

        return <div className="spinner-loader" />;
    }
}

export default Spinner;
