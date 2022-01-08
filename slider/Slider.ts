import {View} from './View';
import {Presenter} from './Presenter';
import {Model} from './Model';

export class Slider {
    view: View;

    elem: HTMLElement;

    presenter: Presenter;

    model: Model;

    constructor(elem: HTMLElement, settings: Record<string, unknown>) {
        this.elem = elem;
        this.model = new Model(this.elem);
        this.model.init(settings);
        this.view = new View(this.elem);
        this.view.init(this.model.state);
        this.presenter = new Presenter(this.elem, this.model, this.view);
    }

    hideBubble(): boolean {
        this.view.hideBubble();
        return true;
    }

    showBubble(): boolean {
        this.view.showBubble();
        return true;
    }

    changeOrientation(value: string): boolean {
        this.view.changeOrientation(value);
        this.model.changeOrientation = value;
        return true;
    }

    changeType(value: string): boolean {
        this.view.changeType(value);
        this.model.changeType = value;
        return true;
    }

    changeStep(value: number): boolean {
        this.model.changeStep = value;
        this.view.changeStep = value;
        return true;
    }

    changeTo(value: number): boolean {
        this.model.changeTo(value);
        return true;
    }

    changeFrom(value: number): boolean {
        this.model.changeFrom(value);
        return true;
    }

    changeMax(value: number): boolean {
        this.model.changeMax(value);
        this.view.changeMax(value);
        return true;
    }

    changeMin(value: number): boolean {
        this.model.changeMin(value);
        this.view.changeMin(value);
        return true;
    }
}