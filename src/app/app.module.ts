import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { ListComponent } from './ticket/list/list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './ticket/new/new.component';
import { DetailComponent } from './ticket/detail/detail.component';

@NgModule({
    declarations: [AppComponent, ListComponent, NewComponent, DetailComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
