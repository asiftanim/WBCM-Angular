import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEditCaseComponent } from './user-add-edit-case.component';

describe('UserAddEditCaseComponent', () => {
  let component: UserAddEditCaseComponent;
  let fixture: ComponentFixture<UserAddEditCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddEditCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEditCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
