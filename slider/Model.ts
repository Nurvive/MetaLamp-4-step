import {Observer} from './observer';

interface state {
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
        super();
        this.elem = elem;
        this.state = {};
    }

    init(options: object): void {
        Object.assign(this.state, options);
    }

    calcPosition(data): void {
        let updatedValue: number;
        let updatedProperty: string;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcValue(data.Pos);
            updatedValue = this.validValueTo(updatedValue);
            this.state.valueTo = updatedValue
        } else if (data.target === 'value') {
            updatedValue = this.calcValue(data.Pos);
            if (this.state.type === 'single') {
                updatedProperty = 'valueTo';
            } else {
                const isValueTo = () => (updatedValue - this.state.valueFrom) / (this.state.valueTo - this.state.valueFrom) >= 0.5;
                updatedProperty = isValueTo() ? 'valueTo' : 'valueFrom';
            }
            this.state[updatedProperty] = updatedValue
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcValue(data.Pos);
            updatedValue = this.validValueFrom(updatedValue);
            this.state.valueFrom = updatedValue
        }
        this.notify({target: updatedProperty, value: updatedValue});
    }

    calcValue(value: number): number {
        value *= (this.state.max - this.state.min);

        return this.state.min + +this.calcValueByStep(value);
    }

    calcValueByStep(value: number): string {
        const stepsInValue: number = value / this.state.step;

        if (stepsInValue % 1 >= 0.5) {
            value = this.state.step * Math.ceil(stepsInValue);
        } else {
            value = this.state.step * Math.floor(stepsInValue);
        }

        const accuracy: number = this.state.step.toString().includes('.') ? (this.state.step.toString().split('.').pop().length) : 0;

        return value.toFixed(accuracy);
    }

    validValueTo(valueTo: number): number {
        let value: number = valueTo;

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

    validValueFrom(valueFrom: number): number {
        let value: number = valueFrom;

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

    set changeOrientation(value: string) {
        this.state.direction = value
    }

    set changeType(value: string) {
        this.state.type = value
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min)
            throw "Шаг не может быть больше разницы максимума и минимума"
        this.state.step = value
    }

    changeTo(value: number): void {
        this.state.valueTo = this.validValueTo(value)
        this.notify({value: this.state.valueTo, target: 'valueTo'})
        //TODO передавать проверенное value в view
    }

    changeFrom(value: number): void {
        this.state.valueFrom = this.validValueFrom(value)
        this.notify({value: this.state.valueFrom, target: 'valueFrom'})
    }
}
