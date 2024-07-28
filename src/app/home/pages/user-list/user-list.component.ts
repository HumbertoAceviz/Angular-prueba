import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  users: User[] = [];


  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.loadUsers()

  }


  loadUsers(): void {
    this.users = this.userService.getUsers();
    console.log('Usuarios obtenidos:', this.users);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.loadUsers();
  }


}
