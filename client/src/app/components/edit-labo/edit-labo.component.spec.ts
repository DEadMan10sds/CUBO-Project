import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaboComponent } from './edit-labo.component';

describe('EditLaboComponent', () => {
  let component: EditLaboComponent;
  let fixture: ComponentFixture<EditLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLaboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
