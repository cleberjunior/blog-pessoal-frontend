import { Component, Inject } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { PostService } from '../../../services/posts/posts.service';
import { IPostService } from '../../../services/posts/iposts.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostModelForm } from '../../../models/posts.models';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';

@Component({
    selector: 'app-edit-post',
    imports: [PostFormComponent],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.scss',
    providers: [
        { provide: SERVICES_TOKEN.HTTP.POST, useClass: PostService },
        { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
    ]
})
export class EditPostComponent {

  private httpSubscriptions: Subscription[] = []

  post: PostModelForm = { id: 0, titulo: '', conteudo: '', autor: '' }

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.POST) private readonly postService: IPostService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do post')
      this.router.navigate(['posts/list'])
      return
    }
    
    this.httpSubscriptions?.push(this.postService.findById(Number(id)).subscribe(data => this.post = data))
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe())
  }

  onSubmitPost(value: PostModelForm) {
    const { id, ...request } = value
    if (id) {
      this.httpSubscriptions?.push(this.postService.update(id, request).subscribe(_ => {
        this.snackBarManager.show('Postagem autalizada com sucesso!')
        this.router.navigate(['posts/list'])
      }))
      return
    }
    this.snackBarManager.show('Um erro inesperado aconteceu')
    this.router.navigate(['posts/list'])
  }
}
