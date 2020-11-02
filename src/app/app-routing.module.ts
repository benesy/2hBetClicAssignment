import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './ticket/list/list.component';
import { DetailComponent } from './ticket/detail/detail.component';

const routes: Routes = [
  {path: 'ticketList', component: ListComponent},
  {path: 'detail/:id', data: { preload: true }, component: DetailComponent},
  {path: '**', redirectTo: '/ticketList', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
