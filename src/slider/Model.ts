import {Observer} from './Observer';
import {GetRelativeType, State} from './types/types';
import {NotifyData} from './types/types';

class Model extends Observer {
    private readonly state: State;

    constructor(options: State) {
        super();
        this.state = Object.assign({}, options);
    }

    calcPosition(data: NotifyData): void {
        let updatedValue: number;
        let updatedProperty: string;
        if (data.target === 'valueTo') {
            updatedProperty = 'valueTo';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        } else if (data.target === 'value') {
            const {property, value} = this.calcValueHelper(data);
            updatedValue = value;
            updatedProperty = property;
        } else {
            updatedProperty = 'valueFrom';
            updatedValue = this.calcUpdatedValue(data, updatedProperty);
        }
        updatedValue = Number(updatedValue.toFixed(2));
        this.state[updatedProperty] = updatedValue;
        this.notify('state', {
            target: updatedProperty,
            valueNumber: updatedValue
        });
        let position = Model.getValueRelative({
            value: updatedValue,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            target: updatedProperty,
            valueNumber: position
        });
    }

    set bubble(value: boolean) {
        this.state.bubble = value;
        if (value) {
            this.notify('showBubble', {
                target: 'bubble',
                valueBoolean: value
            });
        } else {
            this.notify('hideBubble', {
                target: 'bubble',
                valueBoolean: value
            });
        }
    }

    set direction(value: string) {
        this.state.direction = value;
        this.notify('direction', {
            target: 'direction',
            valueString: value
        });
    }

    set type(value: string) {
        this.state.type = value;
        this.notify('type', {
            target: 'type',
            valueString: value
        });
        if (this.state.min > this.state.valueFrom) {
            this.from = this.state.min;
        }
        if (this.state.valueFrom > this.state.valueTo) {
            this.from = this.state.valueTo;
        }
    }

    set step(value: number) {
        const stepIsValid = (val: number, max: number, min: number): boolean => {
            return val < max - min && val > 0;
        };
        if (!stepIsValid(value, this.state.max, this.state.min)) throw new Error('Шаг не может быть больше разницы максимума и минимума или меньше нуля');
        this.state.step = value;
        this.notify('step', {
            target: 'type',
            valueNumber: value
        });
    }

    get getStep(): number {
        return this.state.step;
    }

    set max(value: number) {
        if (value <= this.state.min) {
            throw new Error('Максимум не может быть меньше или равен минимуму');
        }
        this.state.max = value;
        this.notify('max', {
            target: 'max',
            valueNumber: value
        });
        if (value < this.state.valueTo) {
            this.to = value;
        }
    }

    get getMax(): number {
        return this.state.max;
    }

    set min(value: number) {
        if (value >= this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше или равен максимуму');
        }
        this.state.min = value;
        this.notify('min', {
            target: 'min',
            valueNumber: value
        });
        if (this.state.type === 'double' && value > this.state.valueFrom) {
            this.from = value;
        }
    }

    get getMin(): number {
        return this.state.min;
    }

    set to(value: number) {
        this.state.valueTo = this.validValueTo(value);
        this.notify('state', {
            valueNumber: this.state.valueTo,
            target: 'valueTo'
        });
        let position = Model.getValueRelative({
            value: this.state.valueTo,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            valueNumber: position,
            target: 'valueTo'
        });
    }

    get getValueTo(): number {
        return this.state.valueTo;
    }

    set from(value: number) {
        if (this.state.type === 'single') return;
        this.state.valueFrom = Number(this.validValueFrom(value)
            .toFixed(2));
        this.notify('state', {
            valueNumber: this.state.valueFrom,
            target: 'valueFrom'
        });
        let position = Model.getValueRelative({
            value: this.state.valueFrom,
            min: this.state.min,
            max: this.state.max
        });
        position = Model.moreThan0LessThan1(position);
        this.notify('default', {
            valueNumber: position,
            target: 'valueFrom'
        });
    }

    get getValueFrom(): number {
        return this.state.valueFrom;
    }

    private static moreThan0LessThan1(value: number): number {
        let newValue = value;
        newValue = newValue > 1 ? 1 : newValue;
        newValue = newValue < 0 ? 0 : newValue;
        return newValue;
    }

    private static getValueRelative({
        value,
        min,
        max
    }: GetRelativeType): number {
        return (value - min) / (max - min);
    }

    private calcValue(value: number, updatedProperty = 'valueTo'): number {
        let newValue: number = value;
        newValue *= (this.state.max - this.state.min);
        return this.state.min + this.calcValueByStep(newValue, updatedProperty);
    }

    private calcValueHelper(data: NotifyData) {
        let updatedValue = this.calcUpdatedValueRelative(data);
        let updatedProperty;
        if (this.state.type === 'single') {
            updatedProperty = 'valueTo';
        } else {
            updatedProperty = this.isValueTo(updatedValue) ? 'valueTo' : 'valueFrom';
        }
        updatedValue = updatedProperty === 'valueFrom' ? this.validValueFrom(updatedValue) : this.validValueTo(updatedValue);
        return {
            property: updatedProperty,
            value: updatedValue
        };
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
