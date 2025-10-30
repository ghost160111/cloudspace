import "rc-slider/assets/index.css";
import "./RangeSliderDual.scss";
import { createRef, PureComponent, ReactNode, RefObject } from "react";
import { debounce } from "lodash";
import { className } from "utils/functions/className";
import Slider from "rc-slider";

interface Props {
    min: number;
    max: number;
    step: number;
    values: number[];
    setValues: (values: number[]) => void;
    popupsAreVisible?: boolean;
}

class RangeSliderDual extends PureComponent<Props> {
    rcSliderHandle1: HTMLElement | null;
    rcSliderHandle2: HTMLElement | null;
    rcSliderWrapRef: RefObject<HTMLDivElement | null> = createRef();
    rcSliderHandlePopup1: HTMLDivElement;
    rcSliderHandlePopup2: HTMLDivElement;

    cachedValue1: number = 0;
    cachedValue2: number = 0;

    get rcSliderClass(): string {
        return className("rc-slider-wrap-unique", {
            ["rc-slider-wrap-unique--popup-visible"]: this.props.popupsAreVisible,
        });
    }

    render(): ReactNode {
        const { min, max, step } = this.props;
        return (
            <div className={this.rcSliderClass} ref={this.rcSliderWrapRef}>
                <Slider
                    keyboard
                    range
                    min={min}
                    max={max}
                    step={step}
                    value={this.props.values}
                    onChange={(values: number[]) => {
                        const ceiledMinValue: number = Math.ceil(values[0]);
                        const ceiledMaxValue: number = Math.ceil(values[1]);
                        const minValue: number = ceiledMinValue - 1 <= min ? min : ceiledMinValue - 1;
                        const maxValue: number = ceiledMaxValue >= max ? max : ceiledMaxValue;

                        if (this.cachedValue1 !== minValue && this.rcSliderHandlePopup1) {
                            this.rcSliderHandlePopup1.textContent = minValue.toString();
                        }

                        if (this.cachedValue2 !== maxValue && this.rcSliderHandlePopup2) {
                            this.rcSliderHandlePopup2.textContent = maxValue.toString();
                        }

                        this.cachedValue1 = minValue;
                        this.cachedValue2 = maxValue;

                        this.setValuesDebounced([minValue, maxValue]);
                    }}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (prevProps.values !== this.props.values) {
            const values: number[] = this.props.values;
            const ceiledMinValue: number = Math.ceil(values[0]);
            const ceiledMaxValue: number = Math.ceil(values[1]);
            const min: number = ceiledMinValue - 1 < this.props.min ? this.props.min : ceiledMinValue - 1;
            const max: number = ceiledMaxValue > this.props.max ? this.props.max : ceiledMaxValue;

            if (this.cachedValue1 !== min && this.rcSliderHandlePopup1) {
                this.rcSliderHandlePopup1.textContent = min.toString();
            }

            if (this.cachedValue2 !== max && this.rcSliderHandlePopup2) {
                this.rcSliderHandlePopup2.textContent = max.toString();
            }

            this.cachedValue1 = min;
            this.cachedValue2 = max;
        }
    }

    componentDidMount(): void {
        if (!this.rcSliderWrapRef.current) return;

        this.rcSliderHandle1 = this.rcSliderWrapRef.current.querySelector(".rc-slider-handle-1");
        this.rcSliderHandle2 = this.rcSliderWrapRef.current.querySelector(".rc-slider-handle-2");

        this.rcSliderHandlePopup1 = document.createElement("div");
        this.rcSliderHandlePopup2 = document.createElement("div");

        this.rcSliderHandlePopup1.className = "rc-slider-handle-popup rc-slider-handle-popup-1";
        this.rcSliderHandlePopup2.className = "rc-slider-handle-popup rc-slider-handle-popup-2";

        if (!this.rcSliderHandle1 || !this.rcSliderHandle2) return;

        this.rcSliderHandle1.appendChild(this.rcSliderHandlePopup1);
        this.rcSliderHandle2.appendChild(this.rcSliderHandlePopup2);

        this.rcSliderHandlePopup1.textContent = `${this.props.values[0]}`;
        this.rcSliderHandlePopup2.textContent = `${this.props.values[1]}`;
    }

    componentWillUnmount(): void {
        this.rcSliderHandlePopup1?.remove();
        this.rcSliderHandlePopup2?.remove();
    }

    setValuesDebounced = debounce((values: number[]) => this.props.setValues(values), 1);
}

export default RangeSliderDual;
