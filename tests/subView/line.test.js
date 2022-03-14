import Line from '../../src/slider/subView/Line';

describe('class Line: ', () => {
    const node = document.createElement('div');
    let line;
    beforeEach(() => {
        line = new Line(node, 'horizontal', 'double');
    });
    test('func setType', () => {
        line.setType = 'single';
        expect(line.type)
            .toBe('single');
    });
    test('func getHeight is OK', () => {
        expect(line.getHeight)
            .toBe(line.element.getBoundingClientRect().height);
    });
    test('func getWidth is OK', () => {
        expect(line.getHeight)
            .toBe(line.element.getBoundingClientRect().width);
    });
    test('func getLeftCoordinate is OK', () => {
        expect(line.getHeight)
            .toBe(line.element.getBoundingClientRect().left);
    });
    test('func getTopCoordinate is OK', () => {
        expect(line.getHeight)
            .toBe(line.element.getBoundingClientRect().top);
    });
    test('func progressValue double is OK', () => {
        line.progressBar.style.width = '0';
        line.progressBar.style.height = '100%';
        const To = document.createElement('div');
        To.style.left = '40%';
        To.style.top = '40%';
        const From = document.createElement('div');
        From.style.left = '3%';
        From.style.top = '3%';
        line.progressValue(To, From);
        expect(line.progressBar.style.width)
            .toBe(`${parseInt(To.style.left, 10) - parseInt(From.style.left, 10)}%`);
        expect(line.progressBar.style.left)
            .toBe(From.style.left);
        line.direction = 'vertical';
        line.progressValue(To, From);
        expect(line.progressBar.style.height)
            .toBe(`${parseInt(To.style.top, 10) - parseInt(From.style.top, 10)}%`);
        expect(line.progressBar.style.top)
            .toBe(From.style.top);
    });
    test('func progressValue single is OK', () => {
        line.progressBar.style.width = '0';
        line.progressBar.style.height = '100%';
        line.setType = 'single';
        const To = document.createElement('div');
        To.style.left = '40%';
        To.style.top = '40%';
        line.progressValue(To, undefined);
        expect(line.progressBar.style.width)
            .toBe(To.style.left);
        line.direction = 'vertical';
        line.progressValue(To, undefined);
        expect(line.progressBar.style.height)
            .toBe(To.style.top);
    });
});
