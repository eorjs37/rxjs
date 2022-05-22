import { Component, OnInit } from '@angular/core';
import { Subscription,of, filter, map, from, fromEvent, interval, mergeAll, take, mergeMap, concatMap, delay, tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  subscription:Subscription | undefined;
  title = 'ngrx';

  constructor(){

  }
  
  ngOnInit(){
    console.log('getSwitchMap');
    this.getSwitchMap();
  }

  /**
   * @description : getFrom
   * @returns 
   */
  getFrom(){
    return from([1,2,3,4]).pipe(
      map(v=> `count : ${v}`)
    ).subscribe(console.log);
  }

  /**
   * @description : fromEvent
   */
  fromEvent(){
    const btn = document.getElementById('btn') as HTMLElement; //타입 변환
    const source = fromEvent(btn,'click');
    source.subscribe(console.log);
  }

  /**
   * @description : mergeAll 
   */
  getMergeAll(){
    const btn = document.getElementById('btn2') as HTMLElement;
    const clicks = fromEvent(btn,'click');
    const highOrder = clicks.pipe(
      map(()=> interval(1000).pipe(take(4)))
    );
    const firstOrder = highOrder.pipe(mergeAll(2));

    firstOrder.subscribe(x => console.log(x));
  }

  /**
   * @description : getMergeMap
   */
  getMergeMap(){
    const letters = of('상급복숭아','중급복숭아','초급복숭아');

    // 0     1     2     3    4     5
    // a b c
    // a0 b0 c0 a1 b1 c1

    const result = letters.pipe(
      mergeMap(
        x => interval(1000).pipe(
          take(10),
          map(i => `${x}${i}세트 `)
        )
      )
    )

    result.subscribe(x => console.log(x));
  }


  /**
   * @description concatMap
   */
  getConcatMap(){
    const btn3 = document.getElementById('btn3') as HTMLElement;
    const clicks = fromEvent(btn3,'click');
    const result = clicks.pipe(
      concatMap(
        ev => interval(1000).pipe(take(4))
      )
    );

    result.subscribe(x => console.log(x));
  }

  /**
   * @description : concatMap2
   */
  geConcatMap2(){
    const source = of(3000,5000);

    const example = source.pipe(
      concatMap(val => 
        of(`Delayed by : ${val}ms`).pipe(delay(val))
      )
    );

    const subscribe = example.subscribe(
      val => console.log(`With concatMap : ${val}`)
    )
  }

  /**
   * @description : getMergeMap2
   */
  getMergeMap2(){
    const source = of(3000,5000);

    const mergeMapExample = source.pipe(
      delay(5000),
      mergeMap(val => 
        of(`Delayed by : ${val}ms`).pipe(delay(val))
      )
    )

    mergeMapExample.subscribe(val => console.log(`With mergeMap : ${val}`))

  }


  /**
   * @description :mergeMap은 새로운 stream 기준으로 변환하여 새로운 스트림을 생성한다.
   */
  getMergeMap3(){
    //[0,1,2,3,4,5] : 원본
    from([0,1,2,3,4,5]).pipe(
      mergeMap(data =>
        //새로운 스트림
        interval(data > 2 ? 2000 : 5000)
          .pipe(
            take(1),
            tap(() => console.log(data))
          )
      )
    ).subscribe()
  }

  /**
   * @description : concatMap은 원본 기준이 아닌 새로운 스트림 기준이다.
   * 
   */
  getConcatMap3(){
    //[0,1,2,3,4,5] : 원본
    from([0,1,2,3,4,5]).pipe(
      concatMap(data => 
        interval(data > 2 ? 1000  : 3000).pipe(
          take(1),
          tap(() => console.log(data))
        )
      )
    ).subscribe()
  }

  /**
   * @description getSwitchMap
   */
  getSwitchMap(){
    const btn = document.getElementById('btn4') as HTMLElement;
    const source = fromEvent(btn,'click');
    
    source.pipe(
      tap(() => console.log('btn4 click')),
      switchMap(()=> interval(1000))
    ).subscribe(console.log)

  }
}
