import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatRadioModule,
      MatCardModule,
      MatTreeModule,
      MatMenuModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatButtonToggleModule,
      MatDividerModule,
      MatGridListModule,

   ],
   exports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatRadioModule,
        MatCardModule,
        MatTreeModule,
        MatMenuModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatGridListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSnackBarModule,
   ],
   providers: [
   ]
})

export class AngularMaterialModule { }