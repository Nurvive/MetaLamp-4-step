import {Observer} from "./observer";

export class View extends Observer {
    elem: HTMLElement;
    elemHead: HTMLElement;
    elemHeadBubble: HTMLElement

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.render()
        this.elemHead = document.getElementById('slider__head')
        this.elem.classList.add('slider')
        this.elemHead.style.transform = 'translate(0px, 0px)';
        this.elemHeadBubble = this.elem.querySelector('[data-type="bubble"]')
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

    protected setup() :void {
        this.elemHead.addEventListener('mousedown', this.swipeStart)
        this.elemHead.addEventListener('touchstart', this.swipeStart);
    }

    private isInside(pos:number) :boolean {
        return pos >= 0 && pos < this.elem.offsetWidth;
    }

    getEvent(event:any):MouseEvent {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    }

    swipeStart  = () :void =>  {
        this.elemHeadBubble.style.display = 'block'
        document.addEventListener('touchmove', this.swipeAction, { passive: false });
        document.addEventListener('mousemove', this.swipeAction);
        document.addEventListener('touchend', this.swipeEnd);
        document.addEventListener('mouseup', this.swipeEnd);
    }

    swipeAction = (event: Event) :void => {
        event.preventDefault()
        const evt = this.getEvent(event);
        let xPos = evt.clientX - this.elem.offsetLeft;
        if (this.isInside(xPos)) {
            this.notify({xPos: xPos, elemWidth:this.elem.getBoundingClientRect().width})
        }
    }
    swipeEnd = () :void => {
        document.removeEventListener('touchmove', this.swipeAction, );
        document.removeEventListener('mousemove', this.swipeAction);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
        this.elemHeadBubble.style.display = 'none'
    }

    changePosition(data): void {
        this.elemHeadBubble.innerHTML = String(Math.round(data.position))
        const newPos = (this.elem.getBoundingClientRect().width - this.elemHead.getBoundingClientRect().width) / 100 * data.percentage
        this.elemHead.style.transform = `translate(${newPos}px, 0px)`
    }

}
