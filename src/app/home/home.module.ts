import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '', redirectTo: 'user-list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    HomeComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
