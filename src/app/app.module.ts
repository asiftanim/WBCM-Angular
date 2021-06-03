import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserAddEditCaseComponent } from './components/user/user-add-edit-case/user-add-edit-case.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserAddEditCaseComponent,
    AdminHomeComponent,
    AdminSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
