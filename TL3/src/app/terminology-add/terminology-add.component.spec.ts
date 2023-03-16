import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyAddComponent } from './terminology-add.component';

describe('TerminologyAddComponent', () => {
  let component: TerminologyAddComponent;
  let fixture: ComponentFixture<TerminologyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminologyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
