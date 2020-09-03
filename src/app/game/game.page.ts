import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FizzBuzzService} from '../../services/fizzBuzz.service';
import {map, switchMap, mapTo, first, share, delay, scan, tap} from 'rxjs/operators';
import {isNumeric} from 'rxjs/internal-compatibility';
import {fromEvent, Observable, merge, Subject, zip, Subscription} from 'rxjs';
import {concat} from 'ramda';
import {Choice} from '../models/choice';
import {Input} from '../models/input';
import {Answer} from '../models/answer';
import {Results} from '../models/results';
import {Router} from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
    title = 'FizzyBuzzGame';
    score$ = 0;
    life$ = 3;
    numbers$: Observable<number>;
    numbersSub$: Subscription;
    answers$: Observable<Answer[]>;
    wrongAnswer$: Observable<number>;
    wrongAnswerSub$: Subscription;
    game$: Subscription;
    public onStartClick = new Subject<boolean>();

    constructor(protected fizzBuzzService: FizzBuzzService, private router: Router) {
    }

    @ViewChild('numberButton', {static: true, read: ElementRef}) numberButton: ElementRef;
    @ViewChild('fizzButton', {static: true, read: ElementRef}) fizzButton: ElementRef;
    @ViewChild('buzzButton', {static: true, read: ElementRef}) buzzButton: ElementRef;
    @ViewChild('fizzBuzzButton', {static: true, read: ElementRef}) fizzBuzzButton: ElementRef;


    ngOnInit(): void {
        this.onStartClick.subscribe((response) => {
            this.playGame();
            this.numbers$ = this.fizzBuzzService.numbers$;
            this.numbersSub$ = this.numbers$.subscribe(val => {
                return val;
            });
        });
    }

    playGame() {
        const numberBtn = fromEvent(this.numberButton.nativeElement, 'click');
        const fizzBtn = fromEvent(this.fizzButton.nativeElement, 'click');
        const buzzBtn = fromEvent(this.buzzButton.nativeElement, 'click');
        const fizzBuzzBtn = fromEvent(this.fizzBuzzButton.nativeElement, 'click');

        const ChoiceArray = (): Observable<Input> =>
            merge<Choice>(
                numberBtn.pipe(mapTo('Number')),
                fizzBtn.pipe(mapTo('Fizz')),
                buzzBtn.pipe(mapTo('Buzz')),
                fizzBuzzBtn.pipe(mapTo('FizzBuzz')),
                this.fizzBuzzService.numbers$.pipe(mapTo('-')),
            ).pipe<Input>(
                first(null, null),
            );

        const game$ = zip<[number, Choice, Input, number[]]>(
            this.fizzBuzzService.numbers$,
            this.fizzBuzzService.fizzBuzz$,
            this.fizzBuzzService.numbers$
                .pipe(
                    delay(1),
                    switchMap(ChoiceArray)
                )
        ).pipe(
            share()
        );

        const score$ = game$.pipe
        (scan((score, [numb, correctAnswer, userAnswer]) =>
            userAnswer && ((isNumeric(correctAnswer) && userAnswer === 'Number') ||
                (correctAnswer === userAnswer)) ? score + 1 : score - 1, 0), tap(score => this.fizzBuzzService.highscore$.next(score))
        );

        this.answers$ = zip(game$, score$).pipe
        (scan<[[number, Choice, Input, number[]], number], Answer[]>((answer, [[numb, correct, user], points]) =>
            concat([{numb, correct, user, points}], answer), []));

        const correctAnswer$: Observable<boolean> = game$.pipe(
            map(([numb, gameAnswer, userAnswer]) => {
                return userAnswer && ((userAnswer === gameAnswer) ||
                    (userAnswer === 'Number' && isNumeric(gameAnswer)));
            })
        );

        this.wrongAnswer$ = correctAnswer$.pipe(
            scan((wrong, correct) => {
                if (!correct) {
                    wrong++;
                }
                return wrong;
            }, 0)
        );
        this.wrongAnswerSub$ = this.wrongAnswer$
            .subscribe((wrongAnswer) => {
                if (wrongAnswer >= this.life$ || this.score$ < 0) {
                    setTimeout(() => {
                        this.reset();
                    }, 1900);
                }
            });
        const fizzBuzzGame$ = zip<[number, Answer[]]>(score$, this.answers$).pipe(
            map(([score, answer]) => ({score, answer} as Results)
            )
        );

        this.game$ = fizzBuzzGame$.subscribe((results: Results) => {
            this.score$ = results.score;
            if (this.score$ < 0) {
                this.score$ = 0;
            }
            if (this.life$ < 0) {
                this.life$ = 0;
            }
        });
    }

    reset(): void {
        alert(`Game Over!  You\'ve got ${this.score$} points.`);
        if (this.score$ >= 3) {
            this.router.navigate(['/highscores'], {replaceUrl: true});
        }
        this.stopGame();
    }

    stopGame(): void {
        this.score$ = 0;
        this.life$ = 3;
        this.numbers$ = null;
        this.answers$ = null;
        this.numbersSub$.unsubscribe();
        this.game$.unsubscribe();
        this.wrongAnswer$ = null;
        this.wrongAnswerSub$.unsubscribe();
    }

    correctAnswer(userAnswer, gameAnswer): boolean {
        return userAnswer && ((userAnswer === gameAnswer) ||
            (userAnswer === 'Number' && isNumeric(gameAnswer)));
    }
}
