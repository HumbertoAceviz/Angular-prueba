import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');

  //Se hace una llamada a la bd para obtener la lista de usuarios, y se les asigna un id
  getUsers(): Observable<User[]> {
    return collectionData(this.userCollection, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  //Se mandan los campos del usuario  ala bd, para agregar uno nuevo
  addUser(name: string, email: string): Observable<string> {
    const userCreate = { name, email };
    const promise = addDoc(this.userCollection, userCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  //Se mande el id y los campos del usuario que sera editado
  updateUser(
    userId: string,
    dataToUpdate: { name: string; email: string }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'users/' + userId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise);
  }

  //Se trae un usuario especifico por medio del id
  getUserById(userId: string): Observable<User> {
    const docRef = doc(this.firestore, `users/${userId}`);
    return docData(docRef, { idField: 'id' }) as Observable<User>;
  }

  //Se elimina un usuario espefico, mediante el id que obtenemos del usuario
  removeUser(userId: String): Observable<void> {
    const docRef = doc(this.firestore, `users/${userId}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
