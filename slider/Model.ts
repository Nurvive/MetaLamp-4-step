import {Observer} from "./observer";

export class Model extends Observer {
    elem: HTMLElement;
    bubble: number

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.bubble = 0

    }

    bubbleValue() {
        return this.bubble
    }

    changeBubbleValue(optoins) {
        if (optoins.direction === "+")
            this.bubble += optoins.value
        else
            this.bubble -= optoins.value
        this.notify(this.bubbleValue())
    }

}
