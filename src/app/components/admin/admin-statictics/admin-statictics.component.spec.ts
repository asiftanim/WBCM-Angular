import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticticsComponent } from './admin-statictics.component';

describe('AdminStaticticsComponent', () => {
  let component: AdminStaticticsComponent;
  let fixture: ComponentFixture<AdminStaticticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaticticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaticticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
