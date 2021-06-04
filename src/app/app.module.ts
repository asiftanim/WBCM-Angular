import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserAddEditCaseComponent } from './components/user/user-add-edit-case/user-add-edit-case.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLayoutComponent } from './components/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserAddEditCaseComponent,
    AdminHomeComponent,
    AdminSettingsComponent,
    UserLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
