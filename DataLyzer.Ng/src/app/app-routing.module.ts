import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { getGuards } from './guards/guards';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  <Route>{
    path: '', component: AppComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
      <Route>{ path: 'main', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule), canActivate: [AuthenticatedGuard] },
      <Route>{ path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule), canActivate: [AuthenticatedGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [...getGuards()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
