# Rxjs
>옵져버블(Obserable) : 데이터 스트림을 생성하는 객체  
 옵저버(Observer) : 옵저버블에서 받은 데이터를 처리하는 객체
 오퍼레이터(Operator) : 옵저버블에서 발생된 데이터들을 필터, 변환 시켜주는 역할


## mergeMap
> 두개의 옵져버블(Obserable)을 합쳐주는 역할을 하지만, 비동기로 처리가 된다.

```typescript
ngOnInit(): void {
    this.click();
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
```
> 위 예제에서는 click이벤트를 발생시키고 좌표값을 2초뒤에 return 시켜주도록 만들었다. mergeMap은 비동기로 처리 되므로, 좌표값들이 2초뒤에 나오지않는다.


## concatMap
> 두개의 옵져버블(Obserable)을 합쳐주는 역할을 하지만, 동기로 처리가 된다.

```typescript

ngOnInit(): void {
    this.supplyConcatMap();
}

sourceConcatMap(){
    const source = of(2000,1000);
    source.pipe(
      concatMap(val => of(`Delayed by : ${val}ms`).pipe(delay(val)))
    )
    .subscribe(val => console.log(`With ConcatMap : ${val}`))
}
```
> 위 예제에서는 of를 이용해서 2000,1000을 방출시킨다. mergeMap과 차이점은 비동기 처리가 아닌 동기로 처리하는 방식이다.