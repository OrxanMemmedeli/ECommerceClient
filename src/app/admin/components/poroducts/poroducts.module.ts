import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoroductsComponent } from './poroducts.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from 'src/app/ui/ui-components/products/products.component';



@NgModule({
  declarations: [
    PoroductsComponent
  ],
  imports: [
    CommonModule,    
    RouterModule.forChild([
      {path: "", component: ProductsComponent}
    ])
  ]
})
export class PoroductsModule { }
