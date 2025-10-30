import { ComponentType, PureComponent, ReactNode, Suspense } from "react";
import styles from "./lazyLoaded.module.scss";
import Spinner from "components/Loaders/Spinner";

export function lazyLoaded(Component: ComponentType<unknown>) {
    return class LazyLoaded extends PureComponent {
        render(): ReactNode {
            return (
                <Suspense
                    fallback={
                        <div className={styles["loader-wrap"]}>
                            <Spinner fullsizeCentered />
                        </div>
                    }
                >
                    <div className={styles["lazy-wrap"]}>
                        <Component />
                    </div>
                </Suspense>
            );
        }
    };
}
