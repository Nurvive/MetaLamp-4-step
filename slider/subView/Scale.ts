export default class Scale {
    parent: HTMLElement;

    direction: string;

    template: string;

    element: HTMLElement;

    constructor(parent: HTMLElement, direction: string, min: number, max: number) {
        this.parent = parent;
        this.direction = direction;
        this.template = this.direction === 'horizontal'
            ? '<div class="slider__scale"></div>'
            : '<div class="slider__scale slider__scale_vertical"></div>';
        this.parent.insertAdjacentHTML('beforeend', this.template);
        // Здесь приведение через "as" оправдано, так как элемент точно создается строчкой выше
        this.element = this.parent.querySelector('.slider__scale') as HTMLElement;
        this.init(min, max);
    }

    init(min: number, max: number): void {
        const step = (max - min) / 4;
        for (let i = 0; i <= 100; i += 5) {
            if (i % 25 === 0) {
                if (this.direction === 'horizontal') {
                    this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash' style='left: ${i}%;'></div><div class='slider__scale-number' style='left: ${i}%;'></div>`);
                } else {
                    this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_vertical' style='top: ${i}%;'></div><div class='slider__scale-number slider__scale-number_vertical' style='top: ${i}%;'></div>`);
                }
                const numbers = this.element.querySelectorAll('.slider__scale-number');
                const number = numbers[numbers.length - 1];

                i === 0
                    ? number.innerHTML = String(min)
                    : number.innerHTML = String(min + (i / 25) * step);
            } else if (this.direction === 'horizontal') {
                this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small' style='left: ${i}%;'></div>`);
            } else {
                this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small-vertical' style='top: ${i}%;'></div>`);
            }
        }
    }

    removeScale(): void {
        this.element.remove();
    }

    get getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    get getLeftCoordinate(): number {
        return this.element.getBoundingClientRect().left;
    }

    get getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }

    get getTopCoordinate(): number {
        return this.element.getBoundingClientRect().top;
    }
}
