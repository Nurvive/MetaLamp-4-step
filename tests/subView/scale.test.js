import Scale from '../../src/slider/subView/Scale';

describe('class Scale: ', () => {
    const node = document.createElement('div');
    let scale;
    beforeEach(() => {
        scale = new Scale({
            parent: node,
            direction: 'horizontal',
            min: 1,
            max: 100
        });
    });
    test('func getHeight is OK', () => {
        expect(scale.getHeight)
            .toBe(scale.element.getBoundingClientRect().height);
    });
    test('func getWidth is OK', () => {
        expect(scale.getWidth)
            .toBe(scale.element.getBoundingClientRect().width);
    });
    test('func getHeight is OK', () => {
        expect(scale.getLeftCoordinate)
            .toBe(scale.element.getBoundingClientRect().left);
    });
    test('func getHeight is OK', () => {
        expect(scale.getTopCoordinate)
            .toBe(scale.element.getBoundingClientRect().top);
    });
});
