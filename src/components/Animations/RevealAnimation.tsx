import { createRef, PureComponent, ReactNode, RefObject } from "react";
import { className } from "utils/functions/className";
import { bound } from "decorators/bound";
import { Log } from "utils/functions/logger";
import styles from "./RevealAnimation.module.scss";

interface Props {
    children: ReactNode;
    observerInit?: IntersectionObserverInit;
    logSnapshot?: boolean;
    minVisibleRatio?: number;
    minHeight?: number;
    maxAspectRatio?: number;
    once?: boolean;
}

interface State {
    isIntersecting: boolean;
}

class RevealAnimation extends PureComponent<Props, State> {
    observer: IntersectionObserver;
    containerRef: RefObject<HTMLDivElement | null> = createRef<HTMLDivElement>();

    state: Readonly<State> = {
        isIntersecting: false,
    };

    get computedClassName(): string {
        return className(styles["container"], {
            [styles["container--reveal"]]: this.state.isIntersecting,
        });
    }

    @bound
    observerCallback(entries: IntersectionObserverEntry[]): void {
        if (this.props.once && this.state.isIntersecting) return;

        entries.forEach((entry) => {
            const visibleRatio = entry.intersectionRatio;
            const elementHeight = entry.boundingClientRect.height;
            const aspectRatio = entry.boundingClientRect.width / elementHeight;
            const meetsVisibility = visibleRatio >= (this.props.minVisibleRatio ?? 0.4);
            const meetsHeight = elementHeight >= (this.props.minHeight ?? 0);
            const meetsAspect = aspectRatio <= (this.props.maxAspectRatio ?? Infinity);
            const isIntersecting = entry.isIntersecting && meetsVisibility && meetsHeight && meetsAspect;

            if (this.props.once && isIntersecting) {
                this.observer.unobserve(entry.target);
            }

            this.setState({ isIntersecting }, () => {
                if (this.props.logSnapshot) {
                    Log.UI({
                        isIntersecting,
                        visibleRatio,
                        elementHeight,
                        aspectRatio,
                        container: this.containerRef.current,
                    });
                }
            });
        });
    }

    componentDidMount(): void {
        const { observerInit } = this.props;
        this.observer = new IntersectionObserver(this.observerCallback, {
            root: observerInit?.root ?? null,
            rootMargin: observerInit?.rootMargin ?? "0px",
            threshold: observerInit?.threshold ?? [0, 0.25, 0.5, 0.75, 1],
        });
        if (this.containerRef.current) {
            this.observer.observe(this.containerRef.current);
        }
    }

    componentWillUnmount(): void {
        this.observer.disconnect();
    }

    render(): ReactNode {
        return (
            <div className={this.computedClassName} ref={this.containerRef}>
                {this.props.children}
            </div>
        );
    }
}

export default RevealAnimation;
