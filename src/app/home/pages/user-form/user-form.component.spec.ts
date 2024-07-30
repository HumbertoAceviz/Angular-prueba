import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

// Mock del servicio de usuarios
class MockUserService {
  getUserById(id: string) {
    return of({ id: '1', name: 'John Doe', email: 'john.doe@example.com' });
  }

  updateUser(id: string, data: { name: string, email: string }) {
    return of(null);
  }

  addUser(name: string, email: string) {
    return of(null);
  }
}

// Mock del ActivatedRoute para pruebas
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => key === 'id' ? '1' : null
    }
  };
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockUserService: MockUserService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService) as unknown as MockUserService;
    mockRouter = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data for editing', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isEdit).toBeTrue();
    expect(component.user).toEqual({ id: '1', name: 'John Doe', email: 'john.doe@example.com' });
  });

  it('should call updateUser and navigate on submit for existing user', (done: DoneFn) => {
    spyOn(mockUserService, 'updateUser').and.callThrough();
    component.user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    component.isEdit = true;
    component.onSubmit();

    setTimeout(() => {
      expect(mockUserService.updateUser).toHaveBeenCalledWith('1', { name: 'John Doe', email: 'john.doe@example.com' });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/user-list']);
      done();
    }, 0);
  });

  it('should call addUser and navigate on submit for new user', (done: DoneFn) => {
    spyOn(mockUserService, 'addUser').and.callThrough();
    component.user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    component.isEdit = false;
    component.onSubmit();

    setTimeout(() => {
      expect(mockUserService.addUser).toHaveBeenCalledWith('John Doe', 'john.doe@example.com');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/user-list']);
      done();
    }, 0);
  });

  it('should navigate to user-list on cancel', () => {
    component.cancel();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/user-list']);
  });
});
