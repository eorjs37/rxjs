import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MergemapComponent } from './pages/mergemap/mergemap.component';
import { ConcatmapComponent } from './pages/concatmap/concatmap.component';
import { SwitchmapComponent } from './pages/switchmap/switchmap.component';

@NgModule({
  declarations: [
    AppComponent,
    MergemapComponent,
    ConcatmapComponent,
    SwitchmapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
