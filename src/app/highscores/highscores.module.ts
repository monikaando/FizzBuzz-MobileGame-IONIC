import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighscoresPageRoutingModule } from './highscores-routing.module';

import { HighscoresPage } from './highscores.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HighscoresPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HighscoresPage]
})
export class HighscoresPageModule {}
