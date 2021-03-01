import { TestBed } from '@angular/core/testing';

import { GridCreatorService } from './grid-creator.service';

describe('GridCreatorService', () => {
  let service: GridCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create cells', () => {
    expect(
      (service as any).createCells({ width: 10, height: 10}).length)
      .toBe(100);
  });

  it('should set width', () => {
    const resultOne: Array<string> = (service as any).setWidth(10).split(" ");
    const resultTwo: Array<string> = (service as any).setWidth(15).split(" ");
    const resultThree: Array<string> = (service as any).setWidth(25).split(" ");

    expect(resultOne.length).toBe(10);
    expect(resultTwo.length).toBe(15);
    expect(resultThree.length).toBe(25);
  });
});
