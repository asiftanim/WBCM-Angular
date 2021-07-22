import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyCaseManagementComponent } from './admin-my-case-management.component';

describe('AdminMyCaseManagementComponent', () => {
  let component: AdminMyCaseManagementComponent;
  let fixture: ComponentFixture<AdminMyCaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMyCaseManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMyCaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
