import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';

const AUTH_ROUTES : Routes = [
    { path : '', redirectTo : 'signup', pathMatch : 'full'},
    { path : 'signup', component : SignupComponent},
    { path : 'signin', component : SigninComponent},
    { path : 'logout', component : LogoutComponent}
]

export const authRouting = RouterModule.forChild(AUTH_ROUTES);