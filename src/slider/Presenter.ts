import {Model} from './Model';
import {View} from './View';

class Presenter {
    private readonly model: Model;

    private readonly view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.view.subscribe('default', this.model.calcPosition.bind(this.model));
        this.model.subscribe('state', this.view.updateState.bind(this.view));
        this.model.subscribe('default', this.view.changePosition.bind(this.view));
        this.model.subscribe('direction', this.view.changeDirection.bind(this.view));
        this.model.subscribe('type', this.view.changeType.bind(this.view));
        this.model.subscribe('step', this.view.changeStep.bind(this.view));
        this.model.subscribe('max', this.view.changeMaxMin.bind(this.view));
        this.model.subscribe('min', this.view.changeMaxMin.bind(this.view));
        this.model.subscribe('showBubble', this.view.showBubble.bind(this.view));
        this.model.subscribe('hideBubble', this.view.hideBubble.bind(this.view));
    }
}

export {Presenter};
