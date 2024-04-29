import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PlaygroundComponent } from './playground/playground.component';
import { NorthwindComponent } from './northwind/northwind.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    title: 'playground',
  },
  {
    path: 'northwind',
    component: NorthwindComponent,
    title: 'northwind',
  },
];

export default routes;
