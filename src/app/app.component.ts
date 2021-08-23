// import { Component, OnInit } from '@angular/core';
// import { Observable, of, from, pipe, } from 'rxjs';
// import { map, filter } from 'rxjs/operators';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {

//   letters: Observable<any> = of('a', 'b', 'c');

//   appleize = pipe(
//     map(n => n + '🍏')
//   );

//   appled = this.appleize(this.letters)

//   ngOnInit() {

//     this.letters.subscribe(observer => {
//       observer.next()
//     })

//   };

//   onStart(): void {

//   }

//   onStop(): void {

//   }

// function delay<T>(delayInMillis: number) {
//   return (observable: Observable<T>) =>
//     new Observable<T>((subscriber) => {
//       // this function will be called each time this
//       // Observable is subscribed to.
//       const allTimerIDs = new Set();
//       let hasCompleted = false;
//       const subscription = observable.subscribe({
//         next(value) {
//           // Start a timer to delay the next value
//           // from being pushed.
//           const timerID = setTimeout(() => {
//             subscriber.next(value);
//             // after we push the value, we need to clean up the timer timerID
//             allTimerIDs.delete(timerID);
//             // If the source has completed, and there are no more timers running,
//             // we can complete the resulting observable.
//             if (hasCompleted && allTimerIDs.size === 0) {
//               subscriber.complete();
//             }
//           }, delayInMillis);

//           allTimerIDs.add(timerID);
//         },
//         error(err) {
//           // We need to make sure we're propagating our errors through.
//           subscriber.error(err);
//         },
//         complete() {
//           hasCompleted = true;
//           // If we still have timers running, we don't want to yet.
//           if (allTimerIDs.size === 0) {
//             subscriber.complete();
//           }
//         },
//       });

//       // Return the teardown logic. This will be invoked when
//       // the result errors, completes, or is unsubscribed.
//       return () => {
//         subscription.unsubscribe();
//         // Clean up our timers.
//         for (const timerID of allTimerIDs) {
//           clearTimeout(timerID);
//         }
//       };
//     });
// }

// // Try it out!
// of(1, 2, 3).pipe(delay(1000)).subscribe(console.log);

// }

import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apples: string = '';

  ngOnInit(): void {
    const apples$: Observable<string> = interval(1000).pipe(
      take(20),
      this.appleize()
    );

    apples$.subscribe(apple => {
      this.apples = apple;
    });
  }

  
  appleize() {
    return function<String> (source: Observable<String>): Observable<string> {
      return new Observable(observer => {
        source.subscribe({
          next(value) {
            let appled = '';
            for (let i = 0; i < Number(value); i++) {
              appled += '🍏';
            }

            observer.next(appled);
          },
          error(error) {
            observer.error(error);
          },
          complete() {
            observer.complete();
          }
        });
      });
    }
  }
}