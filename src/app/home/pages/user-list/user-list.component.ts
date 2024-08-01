import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = new Observable<User[]>();
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) {}

  //Se inicia el componente y se obtiene al lista de usuarios
  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  //Se borra el usuario mediante la funcion del servicio, proporcionadole el user id
  deleteUser(userId: string): void {
    this.userService.removeUser(userId).subscribe({
      next: () => {
        alert('Usuario eliminado exitosamente.');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }

  //Funciona para editar un usuario al seleccionarlo en la lista
  editUser(id: string) {
    this.router.navigate(['/home/user-form', id]);
  }
}
