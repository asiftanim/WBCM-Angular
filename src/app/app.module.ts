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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";
import { ToastaModule } from 'ngx-toasta';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BossInterceptor } from './services/auth/interceptor';
import { AdminMyCaseManagementComponent } from './components/admin/admin-my-case-management/admin-my-case-management.component';
import { ChartsModule } from 'ng2-charts';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  fgsColor: "#1E90FF",
  pbColor: "#1E90FF",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  fgsSize: 70
};

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
    AdminUserManagementComponent,
    AdminMyCaseManagementComponent
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
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    //NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastaModule,
    NgMultiSelectDropDownModule.forRoot(),
    UiSwitchModule,
    ChartsModule
  ],
  providers: [HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: BossInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
