import {Model} from './Model';
import {View} from './View';

class Presenter {
    model: Model;

    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.view.subscribe('state', this.model.updateState.bind(this.model));
        this.view.subscribe('default', this.model.calcPosition.bind(this.model));
        this.model.subscribe('state', this.view.updateState.bind(this.view));
        this.model.subscribe('default', this.view.changePosition.bind(this.view));
    }
}

export {Presenter};
