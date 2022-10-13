import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesSelectorComponent } from './laboratories-selector.component';

describe('LaboratoriesSelectorComponent', () => {
  let component: LaboratoriesSelectorComponent;
  let fixture: ComponentFixture<LaboratoriesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoriesSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoriesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
