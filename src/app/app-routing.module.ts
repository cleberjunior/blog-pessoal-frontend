import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
  },
  {
      path: 'dashboard',
      component: DashboardComponent,
  }, 
  {
    path: 'posts',
    component: PostComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
