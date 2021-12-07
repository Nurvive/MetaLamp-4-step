import {Observer} from "./observer";

interface state {
    initValue?: number;
    min?: number
    max?: number
    position?: number
    step?: number
    direction?: string
}

export class Model extends Observer {
    elem: HTMLElement;
    state: state
    value: number

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.state = {};
    }

    init(options: object) {
        Object.assign(this.state, options);
        this.value = this.state.initValue

    }

    calcPosition(data): void {
        let percentage;
        percentage = data.Pos / data.elemSize * 100;
        this.state.position = this.state.min + ((this.state.max - this.state.min) / 100 * percentage)
        this.state.position = Math.round(this.state.position / this.state.step) * this.state.step
        this.notify({position: this.state.position, percentage: percentage})
        this.value = this.state.position
    }

}
