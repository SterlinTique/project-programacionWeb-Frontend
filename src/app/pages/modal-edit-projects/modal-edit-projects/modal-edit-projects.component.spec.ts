import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProjectsComponent } from './modal-edit-projects.component';

describe('ModalEditProjectsComponent', () => {
  let component: ModalEditProjectsComponent;
  let fixture: ComponentFixture<ModalEditProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
