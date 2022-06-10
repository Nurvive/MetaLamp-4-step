import {Observer} from '../src/slider/Observer';

describe('Class Observer: ', () => {
    let observer;
    const x = (data) => {
        return data.target;
    };
    beforeEach(() => {
        observer = new Observer();
        observer.subscribe('default', x);
    });
    test('should be', () => {
        expect(observer)
            .toBeDefined();
    });
    test('subscribe is working', () => {
        expect(observer.observers[0].observer)
            .toEqual(x);
    });
    test('unsubscribe is working', () => {
        observer.unsubscribe(x);
        expect(observer.observers)
            .toEqual(expect.not.arrayContaining([x]));
    });
});
