export class Observer {
    observers:any

    constructor() {
      this.observers = [];
    }

    subscribe(observer) {
      this.observers.push(observer);
    }

    unsubscribe(observer) {
      this.observers = this.observers.filter((x) => x !== observer);
    }

    notify(data) {
      this.observers.forEach((x) => x(data));
    }
}
