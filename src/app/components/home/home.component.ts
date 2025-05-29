import { Component } from '@angular/core';
import { AngularMaterialModule } from '../commons/angular-material/angular-material.module';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-home',
  imports: [AngularMaterialModule, BlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
