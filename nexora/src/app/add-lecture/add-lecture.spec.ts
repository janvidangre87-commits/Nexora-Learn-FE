import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecture } from './add-lecture';

describe('AddLecture', () => {
  let component: AddLecture;
  let fixture: ComponentFixture<AddLecture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLecture],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLecture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
