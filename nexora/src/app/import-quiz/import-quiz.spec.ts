import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuiz } from './import-quiz';

describe('ImportQuiz', () => {
  let component: ImportQuiz;
  let fixture: ComponentFixture<ImportQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
