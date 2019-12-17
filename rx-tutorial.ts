import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
/*
  Welcome to RxJs Tutorial. If you understood how promises work, you are already halfway there.

  A Promise<T> is an object with two event, either complete with a value of type T, or fail with a
  generic exception. Ideally exactly one of them happens, less ideally at most one of them happens
  and callbacks stay hanging forever.

  An RxJS Observable<T> extends the promise concept with three events instead of two:
  'next', 'error', and 'complete'.
  The object handling these event is called an Observer, and the contract between the two is called
  a Subscription.
  In the lifetime of a subscription the Observable emits to the Observer zero or more 'next' events,
  each of them with a payload of type T, then eventually may terminate the subscription with either a
  'complete' or an 'error'. It is not however required for an Observable to terminate the subscription,
  it is instead very common for an observable to emit continuosly.
  The Observer side, or any third party that can access the subscription object, can terminate early
  a subscription by calling the 'close' method on it.

  Compared to Promises, Observables do not have dedicated language syntax, hence their composition is
  done with plain old functions. The most common pattern is to apply a pipeline of operators to an
  observable that transform it to another observable, and then finally delegate the subscription to
  an element of the UI.

  The starting observable of a pipeline can be created in different ways:
    - the function of(v) creates an observable that on subscription emits the value v, then completes
    - the function from(x) creates an observable from an observable-like object. This can be, among others:
      - a Promise<T>, in which case it creates an observable that emits a single value
        when the promise resolves, then completes. If the promise has already resolved when the subscription
        is created, it emits right away.
      - an Array<T>, in which case it emits on subscription all the elements of the array one by one.
      - an object with observable-like behavior from other compatible observable libraries, in which case
        it wraps the observable and allow using it inside RxJS
    - the function fromEvent(target, eventName) creates an observable which emits a 'next' every time the
      object 'target' emits the event 'eventName' and never completes.
    - a Subject is an Observable which has methods to explicitly trigger the 'next', 'error' and 'complete',
      similar to an observable proxy. There are various flavor of Subject, each slightly different than the others

  There are many other constructors but these are the most common

  Let's see an example of a pipeline:
*/

const setTimeoutP = async (timeout: number) => new Promise((resolve) => { setTimeout(resolve); });

// Emits a next event to all Observers every 1/10 sec, synchronized with the tenth of a second
const clock = new Subject<void>();
(async () => {
  while (true) {
    const sync = 1000 - new Date().getMilliseconds();
    await setTimeoutP(sync);
    clock.next();
  }
})().catch((e) => { console.error(e); });

// Use method 'pipe' to start a pipeline from 'clock'
const clockFaceObs: Observable<string> =
  clock.pipe(
    /*
      'map()' creates a new observable which applies the given function
      to the values emitted by the upstream observable, and emits the results synchronously.
      In this case, it add a Date() payload containing the current timestamp
    */
    map(() => new Date()),
    // Round milliseconds to 1/10 of a second
    map((d) => {
      const ms = d.getMilliseconds();
      const roundms = Math.round(ms / 100) * 100;
      d.setMilliseconds(roundms);

      return d;
    }),
    // Discard all events not aligned with a second
    filter((d) => d.getMilliseconds() !== 0),
    // Print the timestamp into a string
    map((d) => {
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const seconds = d.getSeconds().toString().padStart(2, '0');
      const clockFace = `${hours}:${minutes}:${seconds}`;

      if (clockFace === '00:00:00') {
        return 'Midnight';
      }

      return clockFace;
    }),
    // Remove duplicates
    distinctUntilChanged(),
  );

const subscription = clockFaceObs.subscribe({
  next: (clockFace) => {
    /* in DOM you would do this:
    const clockDomElement = document.getElementById('clock');
    if (clockDomElement !== null) {
      clockDomElement.innerText = clockFace;
    }
    */
    // In NodeJS you do this:
    console.log(clockFace);
    // Cinderella clause
    if (clockFace === 'Midnight') {
      subscription.unsubscribe();
    }
  },
});

/*
  Some interesting operators to check out (the RxJS website also has some nice drawings)
  - map(f) maps values 1:1 with a function f and emits them
  - filter(predicate) apply a predicate to the values and skip those which do not match
  - takeWhile(predicate) apply a predicate to the values and complete the subscription when the predicate becomes false
  - takeUntil(observableB) emits the upstream event and complete the
    downstream subscription when observableB emits (useful for timeouts)
  - switch() transform an Observable<Observable<T>> into an Observable<T> by emitting only the most recent value
    from the most recent Observable emitted by the upstream observable
  - switchMap(f) applies in sequence map(f) and then switch().
  - first() emits the first value emitted by the upstream observable, then completes
  Also of note:
  - combineLatest() is a free function (not an operator) which takes a tuple of observables and transform it
    into an observable of tuples, each event containing the most recent value,emitted by the upstream observable
  - toPromise() is a method of the Observable class that creates a promise that resolves when the 'this' observable
    completes, with the last value emitted by the observable
*/

/** You can now proceed to the angular tutorial. Start with the file  {@link src/main.ts} */
