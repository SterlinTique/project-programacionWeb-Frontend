import { Route } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { Page404Component } from "./page404/page404.component";
export const AUTH_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  { path: '**', redirectTo: 'page404', pathMatch: 'full' },

];
