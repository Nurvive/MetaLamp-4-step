import {Observer} from './Observer';

interface state {
    min: number;
    max: number;
    step: number;
    direction: string;
    type: string;
    valueFrom: number;
    valueTo: number;
    bubble: boolean;

    [key: string]: string | number | boolean | undefined;

}

export interface notifyData {
    valueN?: number;
    valueS?: string;
    valueB?: boolean;
    valueArr?: Array<number>;
    target: string;
    onlyState?: boolean;
}

export class Model extends Observer {
    elem: HTMLElement;

    state: state;

    value: number;

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
        let halfHeadWidth = 0;
        if (data.valueArr !== undefined) {
            halfHeadWidth = data.valueArr[5];
        }
        let lineWidth: number;
        let lineHeight: number;
        let lineLeftCoordinate: number;
        let lineTopCoordinate: number;
        let HeadLeftCoordinate: number;
        let HeadTopCoordinate: number;
        let shift: number;
        let newPosition = 0;
        let updatedValue = 0;
        let updatedProperty: string;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            if (data.valueArr !== undefined) {
                lineWidth = data.valueArr[2];
                lineLeftCoordinate = data.valueArr[3];
                HeadLeftCoordinate = data.valueArr[0];
                shift = data.valueArr[1] - HeadLeftCoordinate;
                newPosition = (data.valueArr[4] - shift - lineLeftCoordinate + halfHeadWidth)
                    / lineWidth;
            }
            newPosition = newPosition > 1 ? 1 : newPosition;
            newPosition = newPosition < 0 ? 0 : newPosition;
            updatedValue = this.calcValue(newPosition);
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
            if (data.valueArr !== undefined) {
                lineHeight = data.valueArr[2];
                lineTopCoordinate = data.valueArr[3];
                HeadTopCoordinate = data.valueArr[0];
                shift = data.valueArr[1] - HeadTopCoordinate;
                newPosition = (data.valueArr[4] - shift - lineTopCoordinate + halfHeadWidth)
                    / lineHeight;
            }
            newPosition = newPosition > 1 ? 1 : newPosition;
            newPosition = newPosition < 0 ? 0 : newPosition;
            updatedValue = this.calcValue(newPosition);
            updatedValue = this.validValueFrom(updatedValue);
        }
        this.updateState({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        let position = Model.getValueRelative(updatedValue, this.state.min, this.state.max);
        position = position > 1 ? 1 : position;
        position = position < 0 ? 0 : position;
        this.notify({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        this.notify({
            target: updatedProperty,
            valueN: position,
            onlyState: false
        });
    }

    static getValueRelative(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    calcValue(value: number): number {
        let newValue: number = value;
        newValue *= (this.state.max - this.state.min);

        return this.state.min + this.calcValueByStep(newValue);
    }

    calcValueByStep(value: number): number {
        let newValue: number = value;
        const stepsInValue: number = newValue / this.state.step;

        if (stepsInValue % 1 >= 0.5) {
            newValue = this.state.step * Math.ceil(stepsInValue);
        } else {
            newValue = this.state.step * Math.floor(stepsInValue);
        }
        const popRes: string | undefined = this.state.step.toString()
            .split('.')
            .pop();
        let accuracy = 0;
        if (popRes !== undefined) {
            accuracy = this.state.step.toString()
                .includes('.') ? (popRes.length) : 0;
        }
        return Number(newValue.toFixed(accuracy));
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
        this.updateState({
            target: 'max',
            valueN: value,
            onlyState: true
        });
        if (value < this.state.valueTo) {
            this.changeTo(value);
        }
    }

    changeMin(value: number): void {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({
            target: 'min',
            valueN: value,
            onlyState: true
        });
        if (value > this.state.valueFrom) {
            this.changeFrom(value);
        }
    }

    changeTo(value: number): void {
        this.updateState({
            target: 'valueTo',
            valueN: this.validValueTo(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueTo,
            target: 'valueTo'
        });
    }

    changeFrom(value: number): void {
        this.updateState({
            target: 'valueFrom',
            valueN: this.validValueFrom(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueFrom,
            target: 'valueFrom'
        });
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
