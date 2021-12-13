import {Observer} from "./observer";

interface state {
    initValue?: number;
    min?: number
    max?: number
    position?: number
    step?: number
    direction?: string
    type?: string
    valueFrom?: number
    valueTo?: number

}

export class Model extends Observer {
    elem: HTMLElement;
    state: state
    value: number

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.state = {};
    }

    init(options: object) {
        Object.assign(this.state, options);
        this.value = this.state.initValue

    }

    calcPosition(data) {
        let updatedValue;
        let updatedProperty;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcValue(data.Pos);
            updatedValue = this.validValueTo(updatedValue);
        } else if (data.target === "value") {
            updatedValue = this.calcValue(data.Pos);
            if (this.state.type === 'single') {
                updatedProperty = 'valueTo';
            } else {
                let isValueTo = () => {
                    return (updatedValue - this.state.valueFrom) / (this.state.valueTo - this.state.valueFrom) >= 0.5;
                }
                updatedProperty = isValueTo() ? 'valueTo' : 'valueFrom';
            }
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcValue(data.Pos);
            updatedValue = this.validValueFrom(updatedValue);
        }
        this.notify({target: updatedProperty, value: updatedValue})

    }

    calcValue(value) {
        value *= (this.state.max - this.state.min);

        return this.state.min + +this.calcValueByStep(value);
    }

    calcValueByStep(value) {
        let stepsInValue = value / this.state.step;

        if (stepsInValue % 1 >= 0.5) {
            value = this.state.step * Math.ceil(stepsInValue);
        } else {
            value = this.state.step * Math.floor(stepsInValue);
        }

        // количество знаков после запятой
        let accuracy = this.state.step.toString().includes('.') ? (this.state.step.toString().split('.').pop().length) : 0;

        return value.toFixed(accuracy);
    }

    validValueTo(valueTo) {
        let value = valueTo;

        if (this.state.type === 'single') {

            if (value > this.state.max) {
                value = this.state.max;
            } else if (value < this.state.min) {
                value = this.state.min;
            }

        } else if (this.state.type === 'double') {
            if (value > this.state.max) {
                value = this.state.max;
            } else if (value <= this.state.valueFrom) {
                value = this.state.valueFrom + this.state.step;
            }
        }
        return value;
    }

    validValueFrom(valueFrom) {
        let value = valueFrom;

        if (this.state.type === 'single') {
            value = null;

        } else if (this.state.type === 'double') {
            if (value < this.state.min) {
                value = this.state.min;
            } else if (value >= this.state.valueTo) {
                value = this.state.valueTo - this.state.step;
            }
        }

        return value;
    }
}
