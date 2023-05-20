import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimeperiodComponent} from "./components/timeperiod/timeperiod.component";

const routes: Routes = [
  {path: 'timeperiod', component: TimeperiodComponent},
  {path: '', redirectTo: '/timeperiod', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
