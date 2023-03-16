import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyItemComponent } from './terminology-item.component';

describe('TerminologyItemComponent', () => {
  let component: TerminologyItemComponent;
  let fixture: ComponentFixture<TerminologyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminologyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminologyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
