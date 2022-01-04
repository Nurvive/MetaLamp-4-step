import {Observer} from './observer';

interface state {
    min: number;
    max: number;
    step: number;
    direction: string;
    type: string;
    valueFrom: number;
    valueTo: number;
    bubble: boolean;

    [key: string]: string | number | boolean | undefined

}

export interface notifyData {
    valueN?: number;
    valueS?: string;
    valueB?: boolean;
    target: string;
    onlyState?: boolean;
}

export class Model extends Observer {
    elem: HTMLElement;

    state: state

    value: number

    constructor(elem: HTMLElement) {
        super();
        this.elem = elem;
        this.state = {
            bubble: true,
            max: 100,
            min: 0,
            step: 1,
            type: 'single',
            valueTo: 100,
            valueFrom: 5,
            direction: 'horizontal'
        };
        this.value = 0;
    }

    init(options: Record<string, unknown>): void {
        Object.assign(this.state, options);
    }

    calcPosition(data: notifyData): void {
        if (data.onlyState) return;
        let updatedValue = 0;
        let updatedProperty: string;
        if (data.valueN !== undefined) {
            updatedValue = this.calcValue(data.valueN);
        }
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.validValueTo(updatedValue);
        } else if (data.target === 'value') {
            if (this.state.type === 'single') {
                updatedProperty = 'valueTo';
            } else {
                const isValueTo = () => (updatedValue - this.state.valueFrom)
                    / (this.state.valueTo - this.state.valueFrom) >= 0.5;
                updatedProperty = isValueTo() ? 'valueTo' : 'valueFrom';
            }
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.validValueFrom(updatedValue);
        }
        this.updateState({target: updatedProperty, valueN: updatedValue, onlyState: true});
        this.notify({target: updatedProperty, valueN: updatedValue});
    }

    calcValue(value: number): number {
        let newValue: number = value;
        newValue *= (this.state.max - this.state.min);

        return this.state.min + +this.calcValueByStep(newValue);
    }

    calcValueByStep(value: number): string {
        let newValue: number = value;
        const stepsInValue: number = newValue / this.state.step;

        if (stepsInValue % 1 >= 0.5) {
            newValue = this.state.step * Math.ceil(stepsInValue);
        } else {
            newValue = this.state.step * Math.floor(stepsInValue);
        }
        const popRes: string | undefined = this.state.step.toString().split('.').pop();
        let accuracy = 0;
        if (popRes !== undefined) {
            accuracy = this.state.step.toString().includes('.') ? (popRes.length) : 0;
        }

        return newValue.toFixed(accuracy);
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
            value = 0;
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
        this.state.direction = value;
    }

    set changeType(value: string) {
        this.state.type = value;
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }

    changeMax(value: number): void {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({target: 'max', valueN: value, onlyState: true});
        if (value < this.state.valueTo) {
            this.changeTo(value);
        }
    }

    changeMin(value: number): void {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({target: 'min', valueN: value, onlyState: true});
        if (value > this.state.valueFrom) {
            this.changeFrom(value);
        }
    }

    changeTo(value: number): void {
        this.updateState({target: 'valueTo', valueN: this.validValueTo(value), onlyState: true});
        this.notify({valueN: this.state.valueTo, target: 'valueTo'});
    }

    changeFrom(value: number): void {
        this.updateState({target: 'valueFrom', valueN: this.validValueFrom(value), onlyState: true});
        this.notify({valueN: this.state.valueFrom, target: 'valueFrom'});
    }

    updateState(data: notifyData): void {
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueS;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueN;
        } else {
            this.state[data.target] = data.valueB;
        }
    }
}
