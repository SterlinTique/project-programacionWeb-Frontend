import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignUsersComponent } from './modal-assign-users.component';

describe('ModalAssignUsersComponent', () => {
  let component: ModalAssignUsersComponent;
  let fixture: ComponentFixture<ModalAssignUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAssignUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssignUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
