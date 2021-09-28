import {Observer} from "./observer";

export class Model extends Observer {
    elem: HTMLElement;
    min:number
    max:number
    step:number
    position:number
    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.min = 0
        this.max = 100
        this.step = 1
        this.position = 0
    }

    calcPosition(data):void {
        const leftPercentage = data.xPos / data.elemWidth * 100
        console.log(leftPercentage)
        this.position = this.min + ((this.max-this.min)/100 * leftPercentage)
        this.position = Math.round(this.position / this.step) * this.step
        console.log(this.position)
        this.notify({position:this.position, percentage:leftPercentage})
    }

}
