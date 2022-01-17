import {notifyData} from './types/types';

class Observer {
    observers: Array<(data: notifyData) => void>

    constructor() {
        this.observers = [];
    }

    subscribe(observer: (data: notifyData) => void): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: (data: notifyData) => void): void {
        this.observers = this.observers.filter((x) => x !== observer);
    }

    notify(data: notifyData): void {
        this.observers.forEach((x) => x(data));
    }
}

export {Observer};
