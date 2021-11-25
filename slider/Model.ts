import {Observer} from "./observer";

interface state {
    min?: number
    max?: number
    position?: number
    step?: number
}

export class Model extends Observer {
    elem: HTMLElement;
    state: state

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.state = {};
    }

    init(options: object) {
        Object.assign(this.state, options);
    }

    calcPosition(data): void {
        const leftPercentage = data.xPos / data.elemWidth * 100
        this.state.position = this.state.min + ((this.state.max - this.state.min) / 100 * leftPercentage)
        this.state.position = Math.round(this.state.position / this.state.step) * this.state.step
        this.notify({position: this.state.position, percentage: leftPercentage})
    }

}
