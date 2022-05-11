import { Component, OnInit } from '@angular/core';
import { Subscription,of, filter, map, from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  subscription:Subscription | undefined;
  title = 'ngrx';

  
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
    // const btn = document.getElementById('btn');

    // const source = fromEvent(btn,'click');
    // source.subscribe(console.log);
  }
}
