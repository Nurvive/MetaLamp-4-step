import {View} from './View';
import {Presenter} from './Presenter';
import {Model} from './Model';

export class Slider {
    view: View;

    elem: HTMLElement;

    presenter: Presenter;

    model: Model;

    constructor(elem: HTMLElement, settings: object) {
        this.elem = elem;
        this.model = new Model(this.elem);
        this.model.init(settings);
        this.view = new View(this.elem);
        this.view.init(this.model.state);
        this.presenter = new Presenter(this.elem, this.model, this.view);
    }

    hideBubble(): void {
        this.view.hideBubble()
    }

    showBubble(): void {
        this.view.showBubble()
    }

    changeOrientation(value: string): void {
        this.view.changeOrientation(value)
        this.model.changeOrientation = value
    }

    changeType(value: string): void {
        this.view.changeType(value);
        this.model.changeType = value;
    }

    changeStep(value: number): void {
        this.model.changeStep = value
        this.view.changeStep = value
    }

    changeTo(value: number): void {
        this.model.changeTo(value)
    }

    changeFrom(value: number): void {
        this.model.changeFrom(value)
    }

    changeMax(value: number): void {
        this.model.changeMax(value)
        this.view.changeMax(value)
    }

    changeMin(value: number): void {
        this.model.changeMin(value)
        this.view.changeMin(value)

    }

}
