import { LoginComponent } from './login/login.component';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';

const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'mantenimiento',component:MantenimientoComponent},
    {path:'menu',component:MenuComponent},
    {path:'seguimiento',component:SeguimientoComponent},
    {path:'**',component:ErrorPersonalizadoComponent}


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
