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
    bubble?: boolean

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
        if (data.onlyState)
            return
        let updatedValue: number;
        let updatedProperty: string;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcValue(data.value);
            updatedValue = this.validValueTo(updatedValue);
        } else if (data.target === 'value') {
            updatedValue = this.calcValue(data.value);
            if (this.state.type === 'single') {
                updatedProperty = 'valueTo';
            } else {
                const isValueTo = () => (updatedValue - this.state.valueFrom) / (this.state.valueTo - this.state.valueFrom) >= 0.5;
                updatedProperty = isValueTo() ? 'valueTo' : 'valueFrom';
            }
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcValue(data.value);
            updatedValue = this.validValueFrom(updatedValue);
        }
        this.updateState({target: updatedProperty, value: updatedValue, onlyState: true})
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

    changeMax(value: number): void {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw "Максимум не может быть меньше минимума"
        }
        this.updateState({target: 'max', value: value, onlyState: true})
        if (value < this.state.valueTo) {
            this.changeTo(value)
        }

    }

    changeMin(value: number): void {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw "Минимум не может быть больше максимума"
        }
        this.updateState({target: 'min', value: value, onlyState: true})
        if (value > this.state.valueFrom) {
            this.changeFrom(value)
        }
    }

    changeTo(value: number): void {
        this.updateState({target:'valueTo',value:this.validValueTo(value),onlyState:true})
        this.notify({value: this.state.valueTo, target: 'valueTo'})
    }

    changeFrom(value: number): void {
        this.updateState({target:'valueFrom',value:this.validValueFrom(value),onlyState:true})
        this.notify({value: this.state.valueFrom, target: 'valueFrom'})
    }

    updateState(data): void {
        if (!data.onlyState)
            return
        this.state[data.target] = data.value
    }
}
