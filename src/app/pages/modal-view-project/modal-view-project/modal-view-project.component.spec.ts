import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewProjectComponent } from './modal-view-project.component';

describe('ModalViewProjectComponent', () => {
  let component: ModalViewProjectComponent;
  let fixture: ComponentFixture<ModalViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
