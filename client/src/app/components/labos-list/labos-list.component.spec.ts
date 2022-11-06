import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabosListComponent } from './labos-list.component';

describe('LabosListComponent', () => {
  let component: LabosListComponent;
  let fixture: ComponentFixture<LabosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
