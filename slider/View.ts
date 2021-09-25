import {Observer} from "./observer";

export class View extends Observer {
    elem: HTMLElement;
    posInit: number;
    posX: number;
    posX2: number;
    trfRegExp: any;
    elemHead: HTMLElement;
    elemHeadBubble:HTMLElement
    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.render()
        this.elemHead = document.getElementById('slider__head')
        this.elem.classList.add('slider')
        this.elemHead.style.transform = 'translate(0px, 0px)';
        this.trfRegExp = /[-0-9.]+(?=px)/
        this.elemHeadBubble = this.elem.querySelector('[data-type="bubble"]')
        this.posX = 0
        this.setup();

    }

    protected getTemplate(): string {
        return `
        <div class="slider__head" id="slider__head">
        <span class="slider__head-bubble" data-type="bubble">0</span>
    </div>
    <ul class="slider__steps">
        <li class="slider__step">0</li>
        <li class="slider__step">25</li>
        <li class="slider__step">50</li>
        <li class="slider__step">75</li>
        <li class="slider__step">100</li>
    </ul>
        `
    }

    protected render(): void {
        this.elem.innerHTML = this.getTemplate();
    }

    protected setup() {
        this.elemHead.addEventListener('mousedown', this.swipeStart)
        this.elemHead.addEventListener('touchstart', this.swipeStart);
    }


    getEvent(event) {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    }

    swipeStart = (event) => {
        const evt = this.getEvent(event);
        this.posInit = this.posX = evt.clientX;
        this.elemHeadBubble.style.display = 'block'
        document.addEventListener('touchmove', this.swipeAction);
        document.addEventListener('mousemove', this.swipeAction);
        document.addEventListener('touchend', this.swipeEnd);
        document.addEventListener('mouseup', this.swipeEnd);
    }

    swipeAction = (event) => {
        event.preventDefault()
        const evt = this.getEvent(event);
        let style = this.elemHead.style.transform;
        let transform = +style.match(this.trfRegExp)[0];
        this.posX2 = this.posX - evt.clientX;
        this.posX = evt.clientX;
        let newPos = transform - this.posX2;

        if (newPos >= 0 && newPos < this.elem.clientWidth - this.elemHead.clientWidth) {
            this.elemHead.style.transform = `translate(${transform - this.posX2}px, 0px)`
            if (this.posX2 >= 1)
                this.notify({direction: '-',value:this.posX2})
            else if(this.posX2 <= -1)
                this.notify({direction: '+', value:this.posX2*-1})
        }
    }

    swipeEnd = () => {
        document.removeEventListener('touchmove', this.swipeAction);
        document.removeEventListener('mousemove', this.swipeAction);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
        this.elemHeadBubble.style.display = 'none'

    }

    changeBubble(value: number): void {
        this.elemHeadBubble.innerHTML = String(value)
    }

}
