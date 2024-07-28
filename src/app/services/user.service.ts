import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
  ];

  constructor() { }

  createUser(user: User): void {
    this.users.push(user);
  }


  getUsers(): User[] {
    return this.users;

  }

  addUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }


}
