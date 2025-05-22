import { Component } from '@angular/core';
import { CardHeaderComponent } from '../commons/card-header/card-header.component';
import { MenuBarComponent } from '../commons/menu-bar/menu-bar.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [    
        CardHeaderComponent, 
        MenuBarComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    title = 'Blog Pessoal';
}
