import {Observer} from "./observer";

interface state {
    initValue?: number;
    min?: number
    max?: number
    position?: number
    step?: number
}

export class Model extends Observer {
    elem: HTMLElement;
    state: state
    value:number
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
        const leftPercentage = data.xPos / data.elemWidth * 100
        this.state.position = this.state.min + ((this.state.max - this.state.min) / 100 * leftPercentage)
        this.state.position = Math.round(this.state.position / this.state.step) * this.state.step
        this.notify({position: this.state.position, percentage: leftPercentage})
        this.value = this.state.position
    }

}
