import {Observer} from './Observer';
import {state} from './types/types';
import {notifyData} from './types/types';
import {stateContent} from './types/types';

class Model extends Observer {
    private elem: HTMLElement;

    private readonly state: state;

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
            direction: 'horizontal',
            // eslint-disable-next-line
            onChangeTo: function () {
            },
            // eslint-disable-next-line
            onChangeFrom: function () {
            }
        };
    }

    init(options: Record<string, stateContent>): void {
        Object.assign(this.state, options);
    }

    calcPosition(data: notifyData): void {
        if (data.onlyState) return;
        let updatedValue: number;
        let updatedProperty: string;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        } else if (data.target === 'value') {
            updatedValue = this.calcUpdatedValueRelative(data);
            if (this.state.type === 'single') {
                updatedProperty = 'valueTo';
            } else {
                updatedProperty = this.isValueTo(updatedValue) ? 'valueTo' : 'valueFrom';
            }
            updatedValue = updatedProperty === 'valueFrom' ? this.validValueFrom(updatedValue) : this.validValueTo(updatedValue);
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        }

        this.updateState({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        this.notify({
            target: updatedProperty,
            valueN: updatedValue,
            onlyState: true
        });
        let position = Model.getValueRelative(updatedValue, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            target: updatedProperty,
            valueN: position,
            onlyState: false
        });
    }

    set changeOrientation(value: string) {
        this.updateState({
            target: 'direction',
            valueS: value,
            onlyState: true
        });
    }

    set changeType(value: string) {
        this.updateState({
            target: 'type',
            valueS: value,
            onlyState: true
        });
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }

    set changeMax(value: number) {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({
            target: 'max',
            valueN: value,
            onlyState: true
        });
        if (value < this.state.valueTo) {
            this.changeTo = value;
        }
    }

    set changeMin(value: number) {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({
            target: 'min',
            valueN: value,
            onlyState: true
        });
        if (value > this.state.valueFrom) {
            this.changeFrom = value;
        }
    }

    set changeTo(value: number) {
        this.updateState({
            target: 'valueTo',
            valueN: this.validValueTo(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueTo,
            target: 'valueTo',
            onlyState: true
        });
        let position = Model.getValueRelative(value, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueN: position,
            target: 'valueTo',
            onlyState: false
        });
    }

    set changeFrom(value: number) {
        this.updateState({
            target: 'valueFrom',
            valueN: this.validValueFrom(value),
            onlyState: true
        });
        this.notify({
            valueN: this.state.valueFrom,
            target: 'valueFrom',
            onlyState: true
        });
        let position = Model.getValueRelative(value, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueN: position,
            target: 'valueFrom',
            onlyState: false
        });
    }

    updateState(data: notifyData): void {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueS;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueN;
        } else {
            this.state[data.target] = data.valueB;
        }
    }

    private static moreThan0LessThan1(value: number): number {
        let newValue = value;
        newValue = newValue > 1 ? 1 : newValue;
        newValue = newValue < 0 ? 0 : newValue;
        return newValue;
    }

    private static getValueRelative(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    private calcValue(value: number): number {
        let newValue: number = value;
        newValue *= (this.state.max - this.state.min);

        return this.state.min + this.calcValueByStep(newValue);
    }

    private calcValueByStep(value: number): number {
        let newValue: number = value;
        if (this.state.step === undefined) throw new Error('Значение step не определено');
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

    private validValueTo(valueTo: number): number {
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

    private validValueFrom(valueFrom: number): number {
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

    private calcUpdatedValue(data: notifyData, updatedProperty: string): number {
        let halfHeadWidth = 0;
        if (data.valueArr !== undefined) {
            halfHeadWidth = data.valueArr[5];
        } else {
            throw new Error('Ожидался массив значений для Model');
        }
        const lineParameter = data.valueArr[2];
        const lineCoordinate = data.valueArr[3];
        const HeadCoordinate = data.valueArr[0];
        const shift = data.valueArr[1] - HeadCoordinate;
        let newPosition = (data.valueArr[4] - shift - lineCoordinate + halfHeadWidth)
            / lineParameter;
        newPosition = Model.moreThan0LessThan1(newPosition);
        const updatedValue = this.calcValue(newPosition);
        return updatedProperty === 'valueTo' ? this.validValueTo(updatedValue) : this.validValueFrom(updatedValue);
    }

    private calcUpdatedValueRelative(data: notifyData): number {
        if (data.valueArr === undefined) {
            throw new Error('Ожидался массив значений для Model');
        }
        const lineParameter = data.valueArr[0];
        const lineCoordinate = data.valueArr[1];
        let newPositionRelative = (data.valueArr[2] - lineCoordinate) / lineParameter;
        newPositionRelative = Model.moreThan0LessThan1(newPositionRelative);
        return this.calcValue(newPositionRelative);
    }

    private isValueTo = (updatedValue: number): boolean => (updatedValue - this.state.valueFrom)
        / (this.state.valueTo - this.state.valueFrom) >= 0.5;
}

export {Model};
