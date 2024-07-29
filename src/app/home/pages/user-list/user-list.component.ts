import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
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

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
  deleteUser(userId: string): void {

    this.userService.removeUser(userId).subscribe({
      next: () => {
        this.users$ = this.userService.getUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  editUser(id: string) {
    this.router.navigate(['/home/user-form', id]);
  }
}
