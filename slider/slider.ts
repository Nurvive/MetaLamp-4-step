import {View} from './View'
import {Presenter} from './Presenter'
import {Model} from './Model'
export class Slider {
    view: View;
    elem: HTMLElement;
    presenter: Presenter;
    model: Model;

    constructor(elem:HTMLElement) {
        this.elem = elem
        this.model = new Model(this.elem)
        this.view = new View(this.elem)
        this.presenter = new Presenter(this.elem, this.model, this.view)
    }
}


