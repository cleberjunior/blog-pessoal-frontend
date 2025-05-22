import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { ListPostsComponent } from './components/posts/list-posts/list-posts.component';
import { NewTemaComponent } from './components/tema/new-tema/new-tema.component';
import { EditTemaComponent } from './components/tema/edit-tema/edit-tema.component';
import { ListTemasComponent } from './components/tema/list-temas/list-temas.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Blog Pessoal' } },
  
    { path: 'post/new-post', component: NewPostComponent, data: { title: 'Cadastrar Post' } },
    { path: 'post/edit-post/:id', component: EditPostComponent, data: { title: 'Atualizar Post' } },
    { path: 'posts/list', component: ListPostsComponent, data: { title: 'Posts Cadastrados' } },
  
    { path: 'tema/new-tema', component: NewTemaComponent, data: { title: 'Cadastrar Tema' } },
    { path: 'tema/edit-tema/:id', component: EditTemaComponent, data: { title: 'Atualizar Tema' } },
    { path: 'temas/list', component: ListTemasComponent, data: { title: 'Temas Cadastrados' } },
];
