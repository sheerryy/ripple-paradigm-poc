import React from "react";

import {
  HomeView,
  AuthorView,
} from "./views";


export const routes: Routes[] = [
  {
    path: '/*',
    exact: false,
    component: HomeView,
  },
  {
    path: '/author',
    component: AuthorView,
  }
]

export type Routes = {
  path: string,
  exact?: boolean,
  component: React.FunctionComponent,
}