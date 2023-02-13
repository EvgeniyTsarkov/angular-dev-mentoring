import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../services/authenticationService';
import { IsAuthenticatedDirective } from './is-authenticated.directive';

describe('IsAuthenticatedDirective', () => {
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent, IsAuthenticatedDirective],
            providers: [AuthenticationService]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();

        localStorage.clear();
    });

    it('user name element should render and display proper text when user is authenticated', () => {
        const expectedUser = {
            id: 1,
            firstName: 'First name',
            lastName: 'Last name',
            email: 'email@email.com',
            password: 'password',
            authenticationToken: 'authToken'
        };

        const userJson = JSON.stringify(expectedUser);

        localStorage.setItem('user', userJson);

        fixture.detectChanges();

        const elementText = fixture.nativeElement.querySelector('.user-name').textContent;

        localStorage.clear();

        expect(elementText).toBe('email@email.com');
    });

    it('user name element should not render when user is not authenticated', () => {
        fixture.detectChanges();

        const userNameElement = fixture.nativeElement.querySelector('.user-name');

        expect(userNameElement).toBeNull();
    });
});
