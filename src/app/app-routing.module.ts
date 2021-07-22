import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCaseManagementComponent } from './components/admin/admin-case-management/admin-case-management.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminSiteSettingsComponent } from './components/admin/admin-site-settings/admin-site-settings.component';
import { AdminStaticticsComponent } from './components/admin/admin-statictics/admin-statictics.component';
import { AdminUserManagementComponent } from './components/admin/admin-user-management/admin-user-management.component';
import { AdminMyCaseManagementComponent } from './components/admin/admin-my-case-management/admin-my-case-management.component';
import { UserAddEditCaseComponent } from './components/user/user-add-edit-case/user-add-edit-case.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';
import { AuthGuard } from './services/auth/AuthGuard';
import { UnAuthGuard } from './services/auth/UnAuthGuard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'case', component: UserAddEditCaseComponent },
      { path: 'case/:id/:mode', component: UserAddEditCaseComponent },
    ]
  },
  {
    path: 'admin',
    canActivate: [UnAuthGuard],
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'case/:id/:mode', component: UserAddEditCaseComponent },
      { path: 'home', component: AdminHomeComponent },
      { path: 'settings', component: AdminSiteSettingsComponent },
      { path: 'case-management', component: AdminCaseManagementComponent },
      { path: 'my-case-management', component: AdminMyCaseManagementComponent },
      { path: 'statictics', component: AdminStaticticsComponent },
      { path: 'user-management', component: AdminUserManagementComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
