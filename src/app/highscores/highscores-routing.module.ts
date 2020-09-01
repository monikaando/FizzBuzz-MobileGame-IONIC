import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HighscoresPage } from './highscores.page';

const routes: Routes = [
  {
    path: '',
    component: HighscoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HighscoresPageRoutingModule {}
