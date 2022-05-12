import { Component, OnInit } from '@angular/core';
import { Subscription,of, filter, map, from, fromEvent, interval, mergeAll } from 'rxjs';

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
    console.log('Subscription');
    this.subscription = of('복숭아','물고기').pipe(
      filter(v => v==='복숭아'),
      map(v=> v+'통조림')
    ).subscribe(console.log);

    //getFrom
    console.log('getFrom');
    this.getFrom();

    //fromEvent
    console.log('fromEvent');
    this.fromEvent();

    //mergeAll
    console.log('getMergeAll');
    this.getMergeAll();
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
    const highOrder = clicks.pipe(map(()=> interval(1000)));
    const firstOrder = highOrder.pipe(mergeAll());

    firstOrder.subscribe(x => console.log(x));
  }
}
