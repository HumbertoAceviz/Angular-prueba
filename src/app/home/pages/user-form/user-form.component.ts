import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User = { id: 0, name: '', email: '' };

  constructor(private userService: UserService, private router: Router) { }

  addUser(): void {
    this.userService.addUser(this.user);
    this.router.navigate(['/home/user-list']);
  }

}
