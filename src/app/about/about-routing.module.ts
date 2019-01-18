import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AbcComponent } from './abc/abc.component';
import { XyzComponent } from './xyz/xyz.component';
import { EfgComponent } from './efg/efg.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
        data: { name: 'contact component', reuse: true },
        children: [
          { path: '', component: AbcComponent, data: { name: 'abc component', reuse: true } },
          { path: 'xyz', component: XyzComponent, data: { name: 'xyz component', reuse: true } },
          { path: 'efg', component: EfgComponent, data: { name: 'efg component', reuse: true } }
        ]
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { name: 'product component', reuse: true },
        children: [
          { path: '', component: AbcComponent, data: { name: 'abc component', reuse: true } },
          { path: 'xyz', component: XyzComponent, data: { name: 'xyz component', reuse: true } },
          { path: 'efg', component: EfgComponent, data: { name: 'efg component', reuse: true } }
        ]
      },
    ],
    data: {
      name: 'about component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
