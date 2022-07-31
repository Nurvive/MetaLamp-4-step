import {View} from './View';
import {Presenter} from './Presenter';
import {Model} from './Model';
import {DirectionType, State, TypeOfSlider} from './types/types';

class Slider {
    private readonly view: View;

    readonly elem: HTMLElement;

    private readonly presenter: Presenter;

    private readonly model: Model;

    constructor(elem: HTMLElement, settings: State) {
        this.elem = elem;
        this.model = new Model(settings);
        this.view = new View(this.elem, settings);
        this.view.init();
        this.presenter = new Presenter(this.model, this.view);
    }

    hideBubble(): Slider {
        this.model.bubble = false;
        return this;
    }

    showBubble(): Slider {
        this.model.bubble = true;
        return this;
    }

    changeDirection(value: DirectionType): Slider {
        this.model.direction = value;
        return this;
    }

    changeType(value: TypeOfSlider): Slider {
        this.model.type = value;
        return this;
    }

    changeStep(value: number): Slider {
        this.model.step = value;
        return this;
    }

    changeTo(value: number): Slider {
        this.model.to = value;
        return this;
    }

    changeFrom(value: number): Slider {
        this.model.from = value;
        return this;
    }

    changeMax(value: number): Slider {
        this.model.max = value;
        return this;
    }

    changeMin(value: number): Slider {
        this.model.min = value;
        return this;
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
