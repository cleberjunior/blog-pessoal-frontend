import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
    // { path: 'temas', component: TemaListComponent, canActivate: [AuthGuard] },
    // { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }
];
