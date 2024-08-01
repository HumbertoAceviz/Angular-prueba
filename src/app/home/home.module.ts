import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';

import { DirectivesModule } from '../modules/directives.module';
import { PipesModule } from '../modules/pipes.module';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'user-form/:id', component: UserFormComponent },
      { path: '**', redirectTo: 'user-list' },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, UserFormComponent, UserListComponent],
  imports: [
    PipesModule,
    DirectivesModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}
