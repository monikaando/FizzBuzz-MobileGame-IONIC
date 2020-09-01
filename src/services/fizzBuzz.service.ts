import {Injectable} from '@angular/core';
import {zip, Observable, timer, BehaviorSubject} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {Highscore} from "../app/models/highscore";
import {Storage} from "@ionic/storage";


@Injectable({
  providedIn: 'root'
})

export class FizzBuzzService {
    constructor(public storage: Storage) {
    }
  numbers$: Observable<number> = timer(0, 1000).pipe(
    map(n => n += 1),
    share()
  );

  fizz$: Observable<string> = this.numbers$.pipe
  (map(n => n % 3 === 0 ? 'Fizz' : null));

  buzz$: Observable<string> = this.numbers$.pipe
  (map(n => n % 5 === 0 ? 'Buzz' : null));

  fizzBuzz$: Observable<number | string> = (
    zip(this.numbers$, this.fizz$, this.buzz$)
      .pipe(
        map(
          ([numbers$, fizz$, buzz$]) =>
            ([fizz$ == null && buzz$ == null ? numbers$ : null,
              fizz$,
              buzz$])
              .filter((v) => v !== null).join('')
        )
      )
  );
    highscore$ = new BehaviorSubject<number>(0);
    highscores: Highscore[] = [];
}
