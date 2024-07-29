import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  user: User = { id: "" , name: '', email: '' };
  isEdit: boolean = false;

  constructor(private userService: UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEdit = true;
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.userService.updateUser1(this.user.id, { name: this.user.name, email: this.user.email }).subscribe({
        next: () => {

          this.router.navigate(['/home/user-list']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    } else {
      this.user.id = Date.now().toString();  
      this.userService.addUser1(this.user.name, this.user.email).subscribe({
        next: (addedUserId: string) => {
          console.log('User added with ID:', addedUserId);
          this.router.navigate(['/home/user-list']);
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }





  addUser(): void {
    this.userService.addUser1(this.user.name, this.user.email).subscribe({
      next: (addedUserId: string) => {

        console.log('User added with ID:', addedUserId);


        this.user.name = '';
        this.user.email = '';


        this.router.navigate(['/home/user-list']);
      },
      error: (err) => {
        console.error('Error adding user:', err);
      }
    });
  }
}
