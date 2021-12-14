import { View } from './View';
import { Presenter } from './Presenter';
import { Model } from './Model';

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
}
