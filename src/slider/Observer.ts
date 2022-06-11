import {NotifyData} from './types/types';

import {EventType, ObserverItem} from './types/types';

type ObserverStore = {
    eventType: EventType
    observer: ObserverItem
}

class Observer {
    observers: ObserverStore[];

    constructor() {
        this.observers = [];
    }

    subscribe(eventType: EventType, observer: ObserverItem): void {
        this.observers.push({
            eventType: eventType,
            observer: observer
        });
    }

    unsubscribe(eventType: EventType, observer: ObserverItem): void {
        this.observers = this.observers.filter((item) => item.observer !== observer);
    }

    notify(eventType: EventType, data: NotifyData): void {
        this.observers.forEach((item) => {
            if (item.eventType === eventType) {
                item.observer(data);
            }
        });
    }
}

export {Observer};
