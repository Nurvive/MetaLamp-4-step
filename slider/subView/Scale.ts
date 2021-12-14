export default class Scale {
    parent: HTMLElement

    direction: string

    template: string

    element: HTMLElement

    constructor(parent: HTMLElement, direction: string) {
      this.parent = parent;
      this.direction = direction;
    }

    init(min: number, max: number) {
      this.template = this.direction === 'horizontal'
        ? '<div class=\'slider__scale\'></div>'
        : '<div class=\'slider__scale slider__scale_vertical\'></div>';
      this.parent.insertAdjacentHTML('beforeend', this.template);
      this.element = this.parent.querySelector('.slider__scale');

      const step = (max - min) / 4;
      if (this.direction === 'horizontal') {
        for (let i = 0; i <= 100; i += 5) {
          if (i % 25 === 0) {
            this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash' style='left: ${i}%;'></div><div class='slider__scale-number' style='left: ${i}%;'></div>`);
            const numbers = this.element.querySelectorAll('.slider__scale-number');
            let number;
            number = numbers[numbers.length - 1];

            i == 0
              ? number.innerHTML = min
              : number.innerHTML = min + i / 25 * step;
          } else {
            this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small' style='left: ${i}%;'></div>`);
          }
        }
      } else {
        for (let i = 0; i <= 100; i += 5) {
          if (i % 25 === 0) {
            this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_vertical' style='top: ${i}%;'></div><div class='slider__scale-number slider__scale-number_vertical' style='top: ${i}%;'></div>`);
            const numbers = this.element.querySelectorAll('.slider__scale-number');
            let number;
            number = numbers[numbers.length - 1];

            i == 0
              ? number.innerHTML = min
              : number.innerHTML = min + i / 25 * step;
          } else {
            this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small-vertical' style='top: ${i}%;'></div>`);
          }
        }
      }
    }

    get getWidth() {
      return this.element.getBoundingClientRect().width;
    }

    get getLeftCoordinate() {
      return this.element.getBoundingClientRect().left;
    }

    get getHeight() {
      return this.element.getBoundingClientRect().height;
    }

    get getTopCoordinate() {
      return this.element.getBoundingClientRect().top;
    }
}
