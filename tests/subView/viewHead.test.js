import ViewHead from '../../src/slider/subView/ViewHead';

describe('class ViewHead: ', () => {
    const node = document.createElement('div');
    let viewHead;
    beforeEach(() => {
        viewHead = new ViewHead(node, 'horizontal', 1, 100);
    });
    test('func getHeight is OK', () => {
        expect(viewHead.getHeight).toBe(viewHead.element.getBoundingClientRect().height);
    });
    test('func getWidth is OK', () => {
        expect(viewHead.getHeight).toBe(viewHead.element.getBoundingClientRect().width);
    });
    test('func hideBubble is OK', () => {
        viewHead.hideBubble();
        expect(viewHead.bubble.style.display).toBe('none');
    });
    test('func updateBubble is OK', () => {
        viewHead.updateBubble(40);
        expect(viewHead.bubble.innerHTML).toBe('40');
        viewHead.bubble = null;
        expect(viewHead.updateBubble(20)).toBeFalsy();
    });
    test('func updatePosition is OK', () => {
        viewHead.updatePosition(0.5);
        expect(viewHead.element.style.left).toBe('50%');
        viewHead.direction = 'vertical';
        viewHead.updatePosition(0.7);
        expect(viewHead.element.style.top).toBe('70%');
    });
    test('func removeHead with parent is OK', () => {
        expect(viewHead.removeHead()).toBeTruthy();
    });
});
