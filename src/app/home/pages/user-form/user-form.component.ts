import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  //Se crea un objeto user para llenar los campos
  user: User = { id: '', name: '', email: '' };

  //Variable para comprobar si esta editando o creando
  isEdit: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //al inciar el componente se obitiene el usuario seleccionado si existe, para rellenar el formulario
  //con sus respectivos campos
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEdit = true;
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  //Funcion al dar aceptar al formulario
  onSubmit(): void {
    //condicon para saber si esta editando o creando un nuevo usuario
    if (this.isEdit) {
      this.userService
        .updateUser(this.user.id, {
          name: this.user.name,
          email: this.user.email,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/home/user-list']);
          },
          error: (err) => {
            console.error('Error updating user:', err);
          },
        });
      //si es nuevo se manda a llamar la funcion para agregar y le mandamos los parametros
    } else {
      this.addUser(this.user.name, this.user.email);
    }
  }

  //  // Agregar usuario mediante el serivicio user
  addUser(name: string, email: string): void {
    this.userService.addUser(name, email).subscribe({
      next: () => {
        //Reseteamos los campos del form
        this.user.name = '';
        this.user.email = '';

        //Regresamos a la lista actualizada
        this.router.navigate(['/home/user-list']);
      },
      error: (err) => {
        console.error('Error adding user:', err);
      },
    });
  }

  //Boton para cancelar y regresar a la lista
  cancel(): void {
    this.router.navigate(['/home/user-list']);
  }
}
