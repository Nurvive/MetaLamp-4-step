export class Slider {
    view: View;
    selector: string;
    elem: HTMLElement;

    constructor(selector: string) {
        this.selector = selector;
        this.elem = document.getElementById(this.selector)
        this.view = new View(this.elem)
    }
}

class View {
    elem: HTMLElement

    constructor(elem: HTMLElement) {
        this.elem = elem
        this.render()
    }

    protected getTemplate(): string {
        return `
        <div class="slider__head">
        <span class="slider__head-bubble">40</span>
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

    protected render():void {
        this.elem.classList.add('slider')
        this.elem.innerHTML = this.getTemplate();
    }
}
