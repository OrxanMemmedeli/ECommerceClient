import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/ui-components/home/home.component';

const routes: Routes = [

  //admin yayout
  {path: "admin", component: LayoutComponent, children: [
    {path: "", component: DashboardComponent},
    {path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule)},
    {path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule)},
    {path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule)}
  ]},

  //esas layouth
  {path:"", component: HomeComponent},
  {path:"baskets", loadChildren: () => import("./ui/ui-components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path:"products", loadChildren: () => import("./ui/ui-components/products/products.module").then(module => module.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
