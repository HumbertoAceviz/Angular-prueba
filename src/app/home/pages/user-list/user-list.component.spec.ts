import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../../services/user.service';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockUserService {
  getUsers() {
    return of([
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
    ]);
  }

  removeUser(userId: string) {
    // Mock implementation to simulate success
    return of(null);
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, FilterPipe],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: UserService, useClass: MockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService) as unknown as MockUserService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.users$.subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('Jane Doe');
    });
  });

  it('should call removeUser and alert on successful deletion', (done: DoneFn) => {
    // Spy on alert to check if it's called
    spyOn(window, 'alert');

    // Spy on the removeUser method
    spyOn(mockUserService, 'removeUser').and.callThrough();

    component.deleteUser('1');
    fixture.detectChanges();

    setTimeout(() => {
      expect(mockUserService.removeUser).toHaveBeenCalledWith('1');
      expect(window.alert).toHaveBeenCalledWith(
        'Usuario eliminado exitosamente.'
      );
      done();
    }, 0); // Set a timeout to let async code complete
  });

  it('should handle error during user removal', (done: DoneFn) => {
    // Spy on alert to check if it's not called
    spyOn(window, 'alert');

    // Mock error response
    spyOn(mockUserService, 'removeUser').and.returnValue(throwError('Error'));

    component.deleteUser('1');
    fixture.detectChanges();

    setTimeout(() => {
      expect(window.alert).not.toHaveBeenCalled();
      done();
    }, 0); // Set a timeout to let async code complete
  });
});
