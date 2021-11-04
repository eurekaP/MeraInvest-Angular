import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {DetailsComponent} from "./components/details/details.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { name: 'home' },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { name: 'details' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { name: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
