import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../commons/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/users.models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedAuthor: string = '';
  authors: string[] = [];
  displayedColumns: string[] = ['nome', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.authors = [...new Set(users.map(p => p.nome))];
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar usuários', 'Fechar', { duration: 3000 });
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesAuthor = !this.selectedAuthor || user.nome === this.selectedAuthor;
      
      return matchesSearch && matchesAuthor;
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            this.loadUsers();
            this.snackBar.open('Usuário criado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Erro ao criar usuário', 'Fechar', { duration: 3000 });
            console.error('Erro ao criar usuário:', error);
          }
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { user: { ...user }, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe({
          next: () => {
            this.loadUsers();
            this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Erro ao atualizar usuário', 'Fechar', { duration: 3000 });
            console.error('Erro ao atualizar usuário:', error);
          }
        });
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Tem certeza que deseja excluir o usuário "${user.nome}"?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir usuário', 'Fechar', { duration: 3000 });
          console.error('Erro ao excluir usuário:', error);
        }
      });
    }
  }
}
