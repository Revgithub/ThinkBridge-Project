import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

const routes: Routes = [
  {path:'',redirectTo:'login',component:LoginComponent},
  {path:'login',component:LoginComponent},
    {path:'Product-list/:username', canActivate:[LoginService],component:InventoryListComponent},
    {path:'Add-Product/:username', canActivate:[LoginService],component:InventoryAddComponent},
    {path:'Add-Product/:username/:name/:price/:key', canActivate:[LoginService],component:InventoryAddComponent},
    {path:'**',redirectTo:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
