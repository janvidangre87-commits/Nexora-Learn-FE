import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurriculuam } from './add-curriculuam';

describe('AddCurriculuam', () => {
  let component: AddCurriculuam;
  let fixture: ComponentFixture<AddCurriculuam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCurriculuam],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCurriculuam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
