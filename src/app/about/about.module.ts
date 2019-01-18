import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AbcComponent } from './abc/abc.component';
import { XyzComponent } from './xyz/xyz.component';
import { EfgComponent } from './efg/efg.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [AboutComponent, AbcComponent, XyzComponent, EfgComponent, ContactComponent, ProductComponent],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
