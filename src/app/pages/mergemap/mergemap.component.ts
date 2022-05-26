import { Component, OnInit } from '@angular/core';
import { concatMap, delay, fromEvent, mergeMap, of, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';
@Component({
  selector: 'app-mergemap',
  templateUrl: './mergemap.component.html',
  styleUrls: ['./mergemap.component.scss']
})
export class MergemapComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    //this.click();

    //ajaxMergeMap
    this.ajaxMergeMap();
  }

  saveLocation(location:any){
    return of(location).pipe(delay(2000));
  }

  click(){
    const click$ = fromEvent(document,'click');

    click$.pipe(
      mergeMap((e:any) =>{
        return this.saveLocation({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      })
    ).subscribe(r => console.log('Saved : ',r));
  }

  ajaxMergeMap(){
    const btn1 = document.getElementById('btn1') as HTMLElement;
    const click$ = fromEvent(btn1,'click');

    click$.pipe(
      mergeMap(() => ajax.getJSON(API_URL))
    )
    .subscribe(console.log);
  }
}
