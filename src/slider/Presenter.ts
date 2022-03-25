import {Model} from './Model';
import {View} from './View';

class Presenter {
    model: Model;

    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.view.subscribe(this.model.updateState.bind(this.model));
        this.view.subscribe(this.model.calcPosition.bind(this.model));
        this.model.subscribe(this.view.updateState.bind(this.view));
        this.model.subscribe(this.view.changePosition.bind(this.view));
    }
}

export {Presenter};
