import { ComponentType, Context, createRef, PureComponent, ReactNode, RefObject } from "react";

export function withContextSelector<C, T, SelectedProps>(
    ContextWrapper: Context<C>,
    WrappedComponent: ComponentType<T>,
    selector: (context: C) => SelectedProps,
): ComponentType<Omit<T, keyof SelectedProps> & { ref?: RefObject<unknown> }> {
    class WithContextComponent extends PureComponent<Omit<T, keyof SelectedProps> & { ref?: RefObject<unknown> }> {
        wrapperRef: RefObject<ComponentType<Omit<T, keyof SelectedProps>> | null> = createRef();

        render(): ReactNode {
            return (
                <ContextWrapper.Consumer>
                    {(contextValue: C) => {
                        const selectedProps = selector(contextValue); // Only extract necessary values
                        return <WrappedComponent {...(this.props as T)} {...selectedProps} ref={this.wrapperRef} />;
                    }}
                </ContextWrapper.Consumer>
            );
        }
    }

    return WithContextComponent;
}
