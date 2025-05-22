import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IPostService } from '../../../services/posts/iposts.service';
import { PostService } from '../../../services/posts/posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { SnackbarManagerService } from '../../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../services/isnackbar-manager.service';
import { PostModelForm } from '../../../models/posts.models';

@Component({
    selector: 'app-new-post',
    imports: [PostFormComponent],
    templateUrl: './new-post.component.html',
    styleUrl: './new-post.component.scss',
    providers: [
        { provide: SERVICES_TOKEN.HTTP.POST, useClass: PostService },
        { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
    ]
})
export class NewPostComponent implements OnDestroy {

  private PostSubscription?: Subscription; // para desinscrever e liberar recurso (memória)

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.POST) private readonly PostService: IPostService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.PostSubscription) {
      this.PostSubscription.unsubscribe();
    }
  }

  onSubmitPost(value: PostModelForm) {
    const { id, ...request } = value;
    this.PostSubscription = this.PostService.save(request).subscribe(_ => {
      this.snackBarManager.show('Postagem cadastrada com sucesso!');
      this.router.navigate(['posts/list']);
    })
  }
}
