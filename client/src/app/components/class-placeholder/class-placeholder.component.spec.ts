import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPlaceholderComponent } from './class-placeholder.component';

describe('ClassPlaceholderComponent', () => {
  let component: ClassPlaceholderComponent;
  let fixture: ComponentFixture<ClassPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
