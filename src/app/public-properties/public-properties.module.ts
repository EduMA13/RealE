import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPropertiesPageRoutingModule } from './public-properties-routing.module';

import { PublicPropertiesPage } from './public-properties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPropertiesPageRoutingModule
  ],
  declarations: [PublicPropertiesPage]
})
export class PublicPropertiesPageModule {}
