import { Component, OnInit } from '@angular/core';
import { concatMap, delay, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-concatmap',
  templateUrl: './concatmap.component.html',
  styleUrls: ['./concatmap.component.scss']
})
export class ConcatmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.sourceConcatMap();
    //this.sourceMergeMap();
    //this.mapToPromiseConcatMap();
    this.supplyConcatMap();
  }

  sourceConcatMap(){
    const source = of(2000,1000);

    source.pipe(
      concatMap(val => of(`Delayed by : ${val}ms`).pipe(delay(val)))
    )
    .subscribe(val => console.log(`With ConcatMap : ${val}`))
  }

  sourceMergeMap(){
    const source = of(2000,1000);

    source.pipe(
      mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    )
    .subscribe(val => console.log(`With mergeMap : ${val}`));
  }

  mapToPromiseConcatMap(){
    const source = of('Hello','GoodBye');

    const examplePromise = (val:any) => new Promise(resolve => resolve(`${val} World!`));

    source.pipe(
      concatMap(val => examplePromise(val))
    )
    .subscribe(val => {
      console.log(`Example w/ Promise : `,val);
    })
  }

  supplyConcatMap(){
    const source = of('Hello', 'Goodbye');
    const examplePromise = (val:any) => new Promise(resolve => resolve(`${val} World!`));

    source.pipe(
      concatMap(
        val => examplePromise(val),
        result => `${result} w/ selector!`
      )
    )
    .subscribe(val => console.log(`Example w/ Selector : `, val))
  }

}
