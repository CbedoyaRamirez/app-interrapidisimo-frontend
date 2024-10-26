import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstudiantesCompartidosComponent } from './list-estudiantes-compartidos.component';

describe('ListEstudiantesCompartidosComponent', () => {
  let component: ListEstudiantesCompartidosComponent;
  let fixture: ComponentFixture<ListEstudiantesCompartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEstudiantesCompartidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEstudiantesCompartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
