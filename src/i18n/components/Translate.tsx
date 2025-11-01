import { mobx } from "decorators/mobx";
import { Component, ReactNode } from "react";
import { T_Keys } from "stores/RootStore";

interface Props {
    tKey: T_Keys;
}

@mobx
class Translate extends Component<Props> {
    render(): ReactNode {
        return this.store.localeStore.t(this.props.tKey);
    }
}

export default Translate;
