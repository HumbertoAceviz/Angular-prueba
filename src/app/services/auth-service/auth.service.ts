import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 firebaseAuth = inject(Auth)

  constructor() { }

  //creamos funcion registrar, para registrar usario mandando el email y password a firebase
  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then (() => {});
    return from(promise);
  }

  //Creamos la funcion para logearnos en firebase con el email y la password
  login (email: string, password : string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password,).then(() => {});
      return from(promise)

  }
}
