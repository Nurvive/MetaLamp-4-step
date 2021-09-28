import {Model} from "./Model";
import {View} from "./View";

export class Presenter {
    elem: HTMLElement;
    model: Model;
    elemHead: HTMLElement;
    view:View
    constructor(elem: HTMLElement, model: Model, view:View) {
        this.elem = elem;
        this.model = model;
        this.elemHead = document.getElementById('slider__head')
        this.view = view
        this.view.subscribe(this.model.calcPosition.bind(this.model))
        this.model.subscribe(this.view.changePosition.bind(this.view))
    }


}


