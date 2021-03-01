import { TestBed } from '@angular/core/testing';
import { Cell } from '../model/cell';

import { CellHandler } from './cell-handler.service';

describe('CellHandler', () => {
  let service: CellHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create index', () => {
    (service as any).cells = createCells();
    (service as any).updateIndex();

    expect((service as any).index.length).toBe(10);
  });

  it('should set cells', () => {
    (service as any).setCells({
      height: 10,
      width: 10
    },
    createCells());

    expect((service as any).index.length).toBe(10);
    expect((service as any).grid.width).toBe(10);
    expect((service as any).cells.length).toBe(100);
  });

  it('should return id', () => {
    expect((service as any).getId({id: 15})).toBe('id15');
  });

  it('should apply rules', () => {
    (service as any).cells = createCells();
    (service as any).cells[4].alive = true;
    (service as any).applyRules();
    expect((service as any).cells.filter(c => c.alive).length).toBe(0);

    (service as any).updateIndex();
    (service as any).cells[(service as any).index[2][3]].alive = true;
    (service as any).cells[(service as any).index[3][3]].alive = true;
    (service as any).cells[(service as any).index[4][3]].alive = true;
    (service as any).applyRules();
    expect((service as any).cells[(service as any).index[3][2]].alive).toBe(true);
    expect((service as any).cells[(service as any).index[3][3]].alive).toBe(true);
    expect((service as any).cells[(service as any).index[3][4]].alive).toBe(true);
  });

  it('should get correct neighbours', () => {
    (service as any).cells = createCells();
    (service as any).updateIndex();

    expect((service as any).getLiveNeighbours((service as any).cells[(service as any).index[3][2]])).toBe(0);

    (service as any).cells[(service as any).index[2][3]].alive = true;
    (service as any).cells[(service as any).index[3][3]].alive = true;
    (service as any).cells[(service as any).index[4][3]].alive = true;

    expect((service as any).getLiveNeighbours((service as any).cells[(service as any).index[3][2]])).toBe(3);
  });

  it('should create block', () => {
    (service as any).setCells({width: 10, height: 10}, createCells());
    (service as any).setBlockFormation();

    expect((service as any).cells.filter(c => c.alive).length).toBe(9);
  });

  it('should create random seed', () => {
    (service as any).setCells({width: 10, height: 10}, createCells());
    (service as any).setRandomFormation();

    expect((service as any).cells.filter(c => c.alive).length).toBeGreaterThan(9);
  });

  it('should create osciliator', () => {
    (service as any).setCells({width: 10, height: 10}, createCells());
    (service as any).setOscilliator();

    expect((service as any).cells.filter(c => c.alive).length).toBe(3);
  });

  it('should create glider', () => {
    (service as any).setCells({width: 10, height: 10}, createCells());
    (service as any).setGlider();

    expect((service as any).cells.filter(c => c.alive).length).toBe(5);
  });
});

function createCells(): Array<Cell> {
  const cells: Array<Cell> = [];
  for (let i = 0; i < 100; i++) {
    cells.push({
      id: i,
      alive: false,
      column: i % 10,
      row: Math.floor(i / 10),
      survives: undefined
    });
  }

  return cells;
}
