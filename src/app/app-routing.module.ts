import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [


    {path:'home',component:HomeComponent},
    {path:'mantenimiento',component:MantenimientoComponent},


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
