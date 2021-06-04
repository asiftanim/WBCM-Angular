import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';
import { UserAddEditCaseComponent } from './components/user/user-add-edit-case/user-add-edit-case.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: UserHomeComponent },
      { path: 'case', component: UserAddEditCaseComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'setting', component: AdminSettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
