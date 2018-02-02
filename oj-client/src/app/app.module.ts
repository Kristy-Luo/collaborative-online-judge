import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { DataService } from './services/data.service';
import { NavbarComponent } from './components/navbar/navbar.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
