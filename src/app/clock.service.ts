import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const setTimeoutP = async (timeout: number) => new Promise((resolve) => { setTimeout(resolve); });

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  constructor() {
    (async () => {
      while (true) {
        const sync = 1000 - DateTime.local().millisecond;
        await setTimeoutP(sync);
        this.voidClock.next();
      }
    })().catch((e) => { console.error(e); });
    this.clock.subscribe();
  }
  private readonly voidClock = new Subject<void>();
  readonly clock = this.voidClock.pipe(
    map(() => DateTime.local()),
    map((d) => {
      const ms = d.millisecond;
      const roundms = Math.round(ms / 100) * 100;

      return d.plus({ milliseconds: roundms - ms });
    }),
  );
}
