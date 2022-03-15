import HeadBubble from '../../src/slider/subView/HeadBubble';

describe('class HeadBubble: ', () => {
    const node = document.createElement('div');
    let headBubble;
    beforeEach(() => {
        headBubble = new HeadBubble(node);
    });

    test('func update is OK', () => {
        headBubble.update(23);
        expect(headBubble.element.textContent)
            .toBe('23');
    });

    test('func show is OK', () => {
        headBubble.show();
        expect(headBubble.element.classList)
            .toEqual(expect.objectContaining({1: 'slider__head-bubble_active'}));
    });

    test('func hide is OK', () => {
        headBubble.hide();
        expect(headBubble.element.classList)
            .toEqual(expect.not.objectContaining({1: 'slider__head-bubble_active'}));
    });
});
