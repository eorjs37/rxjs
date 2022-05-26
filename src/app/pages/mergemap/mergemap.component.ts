import { Component, OnInit } from '@angular/core';
import { delay, fromEvent, mergeMap, of } from 'rxjs';
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
    this.ajaxMergeMap();
    //this.promiseMergeMap();
    //this.resultSelectorMergeMap();
  }

  saveLocation(location:any){
    return of(location).pipe(delay(2000));
  }

  click(){
    //옵저버블
    const click$ = fromEvent(document,'click');

    click$.pipe(
      //Operator
      mergeMap((e:any) =>{
        return this.saveLocation({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      })
    )
    //옵저버
    .subscribe(r => console.log('Saved : ',r));
  }

  ajaxMergeMap(){
    const btn1 = document.getElementById('btn1') as HTMLElement;
    const click$ = fromEvent(btn1,'click');

    click$.pipe(
      mergeMap(() => ajax.getJSON(API_URL))
    )
    .subscribe(r => console.log('Ajax : ',r));
  }

  promiseMergeMap(){
    const myPromise = (val:any) => new Promise(resolve => resolve(`${val} World From Promise`));

    const source$ = of('Hello');

    source$.pipe(
      mergeMap(val => myPromise(val))
    ).subscribe(val => console.log(val))
  }

  resultSelectorMergeMap(){
    const myPromise = (val:any) => new Promise(resolve => resolve(`${val} World From Promise`));

    const source$ = of('Hello');

    source$.pipe(
      mergeMap(
        val => myPromise(val),
        (valueFromSource, valueFromPromise) => {
          return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
        }
      )
    )
    .subscribe(val => console.log(val))
  }
}
