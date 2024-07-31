import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  Firestore,
} from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import {
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';

//mockeamos firestore
class MockFirestore {
  collection(path: string): CollectionReference<DocumentData> {
    return {
      withConverter: () => this,
      path: path,
      id: '',
      type: 'collection',
      firestore: {} as Firestore,
      parent: null,
      doc: jasmine.createSpy('doc'),
    } as unknown as CollectionReference<DocumentData>;
  }
}

describe('UserService', () => {
  let service: UserService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    firestore = TestBed.inject(Firestore);

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users', (done: DoneFn) => {
    const mockUserList: User[] = [
      { id: '1', name: 'zzzzzzzzzz', email: 'zzzzzzzzzz' },
      { id: '2', name: 'aaa', email: 'aaaaa' },
    ];

    spyOn(collection(firestore, 'users'), 'withConverter').and.returnValue({
      collectionData: jasmine
        .createSpy('collectionData')
        .and.returnValue(of(mockUserList)),
    } as unknown as CollectionReference<DocumentData>);

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('aaa');
      expect(users[0].email).toBe('aaaaa');
      expect(users[1].name).toBe('zzzzzzzzzz');
      expect(users[1].email).toBe('zzzzzzzzzz');
      done();
    });
  });
});
