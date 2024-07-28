import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HighlightDirective } from '../directives/highlight.directive';





const routes: Routes = [
  {
    path: '',  children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: '**', redirectTo: 'user-list',}
    ]
  }
];

@NgModule({
  declarations: [
    HighlightDirective,
    HomeComponent,
    UserFormComponent,
    UserListComponent,


  ],
  imports: [

    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
