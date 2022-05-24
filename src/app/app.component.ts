import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnChanges{
  title = 'ngrx';
  
  constructor(){
    this.createObserable();
  }

  ngOnChanges(){

  }
  
  ngOnInit(){
    
  }

  //Obserable
  createObserable(){
    // 옵저버블이 구독될 때 호출되는 구독 함수
    const subscriber = (observer:any) =>{
      try {
        // next 노티피케이션 방출
        observer.next(1);
        observer.next(2);

        // complete 노티피케이션 방출
        observer.complete();
      } catch (error) {
        // error 노티피케이션 방출
        observer.error(error);
      }
      finally{
        // 구독 해지될 때 호출되는 콜백 함수
        return () => console.log('Unsubscribed!')
      }
    }

    //옵저버블(데이터를 방출하는객체)생성
    const observable$ = new Observable(subscriber);

    //구독
    observable$.subscribe({
        // 옵저버블이 방출한 next 노티피케이션에 반응하는 next 메소드
        next(value) { console.log(value)},
        // 옵저버블이 방출한 error 노티피케이션에 반응하는 error 메소드
        error(err) { console.error(err)},
        // 옵저버블이 방출한 complete 노티피케이션에 반응하는 complete 메소드
        complete() { console.log('Complete')}
    })
  }
}
