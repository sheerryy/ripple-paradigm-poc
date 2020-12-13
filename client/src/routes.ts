import React from "react";

import {
  HomeView,
  AuthorView,
  ReportView,
} from "./views";


export const routes: Routes[] = [
  {
    path: '/author',
    component: AuthorView,
  },
  {
    path: '/report',
    component: ReportView,
  },
  {
    path: '/*',
    exact: false,
    component: HomeView,
  }
]

export type Routes = {
  path: string,
  exact?: boolean,
  component: React.FunctionComponent,
}