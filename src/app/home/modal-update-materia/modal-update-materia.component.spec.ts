import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMateriaComponent } from './modal-update-materia.component';

describe('ModalUpdateMateriaComponent', () => {
  let component: ModalUpdateMateriaComponent;
  let fixture: ComponentFixture<ModalUpdateMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
