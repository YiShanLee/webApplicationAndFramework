import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyEditComponent } from './terminology-edit.component';

describe('TerminologyEditComponent', () => {
  let component: TerminologyEditComponent;
  let fixture: ComponentFixture<TerminologyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminologyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
