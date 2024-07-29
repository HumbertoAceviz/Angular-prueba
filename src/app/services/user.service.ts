import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, addDoc,  deleteDoc, docData } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
firestore = inject(Firestore);
userCollection = collection(this.firestore, 'users')



  getUsers(): Observable<User[]> {
    return collectionData(this.userCollection,
       {idField : 'id',
       }) as Observable<User[]>;

  }

  addUser1(name : string, email : string) : Observable<string> {
    const userCreate = {name, email}
    const promise = addDoc(this.userCollection, userCreate).then (response => response.id);
    return from(promise);
  }


  updateUser1(userId: string, dataToUpdate : {name : string, email: string}): Observable<void> {
    const docRef = doc(this.firestore, 'users/' + userId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise)
  }


  getUserById(userId: string): Observable<User> {
    const docRef = doc(this.firestore, `users/${userId}`);
    return docData(docRef, { idField: 'id' }) as Observable<User>;
  }

  removeUser (userId : String) : Observable<void> {
    const docRef = doc(this.firestore, `users/${userId}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }







}
