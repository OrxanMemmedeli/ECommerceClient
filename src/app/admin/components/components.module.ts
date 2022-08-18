import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoroductsModule } from './poroducts/poroducts.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoroductsModule,
    OrdersModule,
    CustomersModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
