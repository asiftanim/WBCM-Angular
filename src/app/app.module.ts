import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserAddEditCaseComponent } from './components/user/user-add-edit-case/user-add-edit-case.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminSiteSettingsComponent } from './components/admin/admin-site-settings/admin-site-settings.component';
import { AdminCaseManagementComponent } from './components/admin/admin-case-management/admin-case-management.component';
import { AdminStaticticsComponent } from './components/admin/admin-statictics/admin-statictics.component';
import { AdminUserManagementComponent } from './components/admin/admin-user-management/admin-user-management.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastaModule } from 'ngx-toasta';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserAddEditCaseComponent,
    AdminHomeComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    AdminLoginComponent,
    AdminSiteSettingsComponent,
    AdminCaseManagementComponent,
    AdminStaticticsComponent,
    AdminUserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxDatatableModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ToastaModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
