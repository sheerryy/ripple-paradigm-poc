import React from "react";

import { HomeView } from "./views";


export const routes: Routes[] = [
  {
    path: '/*',
    exact: false,
    component: HomeView,
  }
]

export type Routes = {
  path: string,
  exact: boolean,
  component: React.FunctionComponent,
}