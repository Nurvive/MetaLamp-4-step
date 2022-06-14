import {View} from './View';
import {Presenter} from './Presenter';
import {Model} from './Model';
import {DirectionType, State, TypeOfSlider} from './types/types';

class Slider {
    view: View;

    elem: HTMLElement;

    presenter: Presenter;

    model: Model;

    constructor(elem: HTMLElement, settings: State) {
        this.elem = elem;
        this.model = new Model(settings);
        this.view = new View(this.elem, settings);
        this.view.init();
        this.presenter = new Presenter(this.model, this.view);
    }

    hideBubble(): boolean {
        this.model.bubble = false;
        return true;
    }

    showBubble(): boolean {
        this.model.bubble = true;
        return true;
    }

    changeDirection(value: DirectionType): boolean {
        this.model.direction = value;
        return true;
    }

    changeType(value: TypeOfSlider): boolean {
        this.model.type = value;
        return true;
    }

    changeStep(value: number): boolean {
        this.model.step = value;
        return true;
    }

    changeTo(value: number): boolean {
        this.model.to = value;
        return true;
    }

    changeFrom(value: number): boolean {
        this.model.from = value;
        return true;
    }

    changeMax(value: number): boolean {
        this.model.max = value;
        return true;
    }

    changeMin(value: number): boolean {
        this.model.min = value;
        return true;
    }

    getMax(): number {
        return this.model.max;
    }

    getMin(): number {
        return this.model.min;
    }

    getValueTo(): number {
        return this.model.valueTo;
    }

    getValueFrom(): number {
        return this.model.valueFrom;
    }

    getStep(): number {
        return this.model.step;
    }
}

export {Slider};
