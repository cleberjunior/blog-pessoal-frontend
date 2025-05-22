import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { PostModelTable } from '../Post.models';
import { PostTableComponent } from '../components/Post-table/Post-table.component';
import { PostService } from '../../services/api-Post/Posts/Posts.service';
import { IPostService } from '../../services/api-Post/Posts/iPosts.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-Posts',
  imports: [PostTableComponent],
  templateUrl: './list-Posts.component.html',
  styleUrl: './list-Posts.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.Post, useClass: PostService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class ListPostsComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = []

  Posts: PostModelTable[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.Post) private readonly httpService: IPostService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(this.httpService.list().subscribe(data => this.Posts = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  update(Post: PostModelTable) {
    this.router.navigate(['Posts/edit-Post', Post.id])
  }

  delete(Post: PostModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(Post.id).subscribe(_ => this.snackBarManager.show(`O Poste ${Post.name} foi excluido com sucesso`))
    )
  }
}
