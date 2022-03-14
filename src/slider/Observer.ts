import {NotifyData} from './types/types';

class Observer {
    observers: Array<(data: NotifyData) => void>

    constructor() {
        this.observers = [];
    }

    subscribe(observer: (data: NotifyData) => void): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: (data: NotifyData) => void): void {
        this.observers = this.observers.filter((x) => x !== observer);
    }

    notify(data: NotifyData): void {
        this.observers.forEach((x) => x(data));
    }
}

export {Observer};
