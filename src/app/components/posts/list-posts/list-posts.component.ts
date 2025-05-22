import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostTableComponent } from '../post-table/post-table.component';
import { PostService } from '../../../services/posts/posts.service';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { PostModelTable } from '../../../models/posts.models';
import { IPostService } from '../../../services/posts/iposts.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { CardHeaderComponent } from '../../commons/card-header/card-header.component';
import { MenuBarComponent } from '../../commons/menu-bar/menu-bar.component';

@Component({
  selector: 'app-list-posts',
  imports: [
    PostTableComponent,
    CardHeaderComponent, 
    MenuBarComponent
  ],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.POST, useClass: PostService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class ListPostsComponent implements OnInit, OnDestroy {

  title = 'Postagens Cadastrados';

  private httpSubscriptions: Subscription[] = []

  posts: PostModelTable[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.POST) private readonly httpService: IPostService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(this.httpService.list().subscribe(data => this.posts = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  update(post: PostModelTable) {
    this.router.navigate(['post/edit-post', post.id])
  }

  delete(post: PostModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(post.id).subscribe(_ => this.snackBarManager.show(`A postagem ${post.titulo} foi excluido com sucesso`))
    )
  }
}
