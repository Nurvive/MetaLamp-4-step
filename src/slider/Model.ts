import {Observer} from './Observer';
import {State} from './types/types';
import {NotifyData} from './types/types';

class Model extends Observer {
    private readonly state: State;

    constructor(options: State) {
        super();
        this.state = Object.assign({}, options);
    }

    calcPosition(data: NotifyData): void {
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
        updatedValue = Number(updatedValue.toFixed(2));
        this.updateState({
            target: updatedProperty,
            valueNumber: updatedValue,
            onlyState: true
        });
        this.notify({
            target: updatedProperty,
            valueNumber: updatedValue,
            onlyState: true
        });
        let position = Model.getValueRelative(updatedValue, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            target: updatedProperty,
            valueNumber: position,
            onlyState: false
        });
    }

    set changeOrientation(value: string) {
        this.updateState({
            target: 'direction',
            valueString: value,
            onlyState: true
        });
    }

    set changeType(value: string) {
        this.updateState({
            target: 'type',
            valueString: value,
            onlyState: true
        });
        if (this.state.min > this.state.valueFrom) {
            this.changeFrom = this.state.min;
        }
        if (this.state.valueFrom > this.state.valueTo) {
            this.changeFrom = this.state.valueTo;
        }
    }

    set changeStep(value: number) {
        const stepIsValid = (val: number, max: number, min: number): boolean => {
            return val < max - min && val > 0;
        };
        if (!stepIsValid(value, this.state.max, this.state.min)) throw new Error('Шаг не может быть больше разницы максимума и минимума или меньше нуля');
        this.state.step = value;
    }

    get getStep(): number {
        return this.state.step;
    }

    set changeMax(value: number) {
        if (value < this.state.min) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({
            target: 'max',
            valueNumber: value,
            onlyState: true
        });
        if (value < this.state.valueTo) {
            this.changeTo = value;
        }
    }

    get getMax(): number {
        return this.state.max;
    }

    set changeMin(value: number) {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({
            target: 'min',
            valueNumber: value,
            onlyState: true
        });
        if (this.state.type === 'double' && value > this.state.valueFrom) {
            this.changeFrom = value;
        }
    }

    get getMin(): number {
        return this.state.min;
    }

    set changeTo(value: number) {
        this.updateState({
            target: 'valueTo',
            valueNumber: this.validValueTo(value),
            onlyState: true
        });
        this.notify({
            valueNumber: this.state.valueTo,
            target: 'valueTo',
            onlyState: true
        });
        let position = Model.getValueRelative(this.state.valueTo, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueNumber: position,
            target: 'valueTo',
            onlyState: false
        });
    }

    get getValueTo(): number {
        return this.state.valueTo;
    }

    set changeFrom(value: number) {
        if (this.state.type === 'single') return;
        this.updateState({
            target: 'valueFrom',
            valueNumber: Number(this.validValueFrom(value)
                .toFixed(2)),
            onlyState: true
        });
        this.notify({
            valueNumber: this.state.valueFrom,
            target: 'valueFrom',
            onlyState: true
        });
        let position = Model.getValueRelative(this.state.valueFrom, this.state.min, this.state.max);
        position = Model.moreThan0LessThan1(position);
        this.notify({
            valueNumber: position,
            target: 'valueFrom',
            onlyState: false
        });
    }

    get getValueFrom(): number {
        return this.state.valueFrom;
    }

    updateState(data: NotifyData): void {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueString;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueNumber;
        } else {
            this.state[data.target] = data.valueBoolean;
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

    private calcValue(value: number, updatedProperty = 'valueTo'): number {
        let newValue: number = value;
        newValue *= (this.state.max - this.state.min);
        return this.state.min + this.calcValueByStep(newValue, updatedProperty);
    }

    private calcValueByStep(value: number, updatedProperty: string): number {
        let newValue: number = value;
        if (this.state.step === undefined) throw new Error('Значение step не определено');
        const stepsInValue: number = newValue / this.state.step;
        if (stepsInValue % 1 >= 0.5) {
            newValue = this.state.step * Math.ceil(stepsInValue);
        } else {
            newValue = this.state.step * Math.floor(stepsInValue);
        }
        if (updatedProperty === 'valueTo') {
            const maxSteps: number = (this.state.max - this.state.min) / this.state.step;
            if (stepsInValue === maxSteps) {
                newValue = this.state.min < 0
                    ? this.state.max + Math.abs(this.state.min)
                    : this.state.max;
            }
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
        if (valueTo > this.state.max) {
            return this.state.max;
        }
        if (valueTo < this.state.min) {
            return this.state.min;
        }
        if (this.state.type === 'double') {
            if (valueTo <= this.state.valueFrom) {
                return this.state.valueFrom + this.state.step;
            }
        }
        return valueTo;
    }

    private validValueFrom(valueFrom: number): number {
        if (valueFrom < this.state.min) {
            return this.state.min;
        }
        if (valueFrom >= this.state.valueTo) {
            return this.state.valueTo - this.state.step;
        }
        return valueFrom;
    }

    private calcUpdatedValue(data: NotifyData, updatedProperty: string): number {
        if (data.valueArray === undefined) {
            throw new Error('Ожидался массив значений для Model');
        }
        const [headCoordinate, clientCoordinate, lineParameter,
            lineCoordinate, swipeClient, halfHeadWidth] = data.valueArray;
        const shift = clientCoordinate - headCoordinate;
        let newPosition = (swipeClient - shift - lineCoordinate + halfHeadWidth)
            / lineParameter;
        newPosition = Model.moreThan0LessThan1(newPosition);
        const updatedValue = this.calcValue(newPosition, updatedProperty);
        return updatedProperty === 'valueTo' ? this.validValueTo(updatedValue) : this.validValueFrom(updatedValue);
    }

    private calcUpdatedValueRelative(data: NotifyData): number {
        if (data.valueArray === undefined) {
            throw new Error('Ожидался массив значений для Model');
        }
        const [lineParameter, lineCoordinate, clientCoordinate] = data.valueArray;
        let newPositionRelative = (clientCoordinate - lineCoordinate) / lineParameter;
        newPositionRelative = Model.moreThan0LessThan1(newPositionRelative);
        return this.calcValue(newPositionRelative);
    }

    private isValueTo = (updatedValue: number): boolean => (updatedValue - this.state.valueFrom)
        / (this.state.valueTo - this.state.valueFrom) >= 0.5;
}

export {Model};
