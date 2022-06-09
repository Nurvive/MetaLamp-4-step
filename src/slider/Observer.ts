import {NotifyData} from './types/types';

type ObserverItem = (data: NotifyData) => void;

class Observer {
    observers: Array<ObserverItem>

    constructor() {
        this.observers = [];
    }

    subscribe(observer: ObserverItem): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: ObserverItem): void {
        this.observers = this.observers.filter((x) => x !== observer);
    }

    notify(data: NotifyData): void {
        this.observers.forEach((x) => x(data));
    }
}

export {Observer};
