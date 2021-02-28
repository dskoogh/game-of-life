import { Formation } from './../enums/formation';
import { Cell } from './../model/cell';
import { Injectable } from '@angular/core';
import { Grid } from '../model/grid';

@Injectable({
  providedIn: 'root'
})
export class CellHandler {

  private ALIVE = "alive";
  private cells: Array<Cell> = [];
  private index: Array<Array<number>> = [];
  private grid: Grid;

  constructor() { }

  setCells(grid, createdCells: Array<Cell>): void {
    this.grid = grid;
    this.cells = createdCells;
    this.updateIndex();
  }

  private updateIndex(): void {
    this.index = [];
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (!this.index[cell.row]) {
        const cols = [];
        cols[cell.column] = i;
        this.index[cell.row] = cols;
      } else {
        this.index[cell.row][cell.column] = i;
      }
    }
  }

  getCells(): Array<Cell> {
    return this.cells;
  }

  setFormation(type: Formation): void {
    switch (type) {
      case Formation.BLOCK:
        this.setBlockFormation();
        break;
      case Formation.BEE_HIVE:
        this.setBeehiveFormation();
        break;
      case Formation.RANDOM:
        this.setRandomFormation();
        break;
      case Formation.OSCILLIATOR:
        this.setOscilliator();
        break;
      case Formation.GLIDER:
        this.setGlider();
    }
  }

  getId(cell: Cell): string {
    return "id" + cell.id;
  }

  updateClass(cell: Cell): void {
    const element = document.getElementById(this.getId(cell));
    if (cell.alive) {

      if (!element.classList.contains(this.ALIVE)) {
        element.classList.add(this.ALIVE);
      }
    } else {
      if (element.classList.contains(this.ALIVE)) {
        element.classList.toggle(this.ALIVE);
      }
    }
  }

  updateCells(): void {
    this.applyRules();
    this.updateIndex();
  }

  applyRules(): void {
    let i = 0;
    const len = this.cells.length;

    while (i < len) {
      const cell: Cell = this.cells[i];

      // Resets cell
      cell.survives = undefined;

      if (cell.alive) {
        const neighbours = this.getLiveNeighbours(cell);
        if (neighbours === 2 || neighbours === 3) {
          cell.survives = true;
        } else {
          cell.survives = false;
        }

      } else {
        if (this.getLiveNeighbours(cell) === 3) {
          cell.survives = true;
        }
      }

      i++;
    }

    this.cells.forEach(c => c.alive = c.survives ? true : false);
  }

  private getLiveNeighbours(cell: Cell): number {
    let neighbours = 0;

    const columnIndexes = [];
    if (this.index[cell.row - 1]) {
      columnIndexes.push(this.index[cell.row - 1][cell.column - 1]);
      columnIndexes.push(this.index[cell.row - 1][cell.column]);
      columnIndexes.push(this.index[cell.row - 1][cell.column + 1]);
    }
    if (this.index[cell.row]) {
      columnIndexes.push(this.index[cell.row][cell.column - 1]);
      columnIndexes.push(this.index[cell.row][cell.column + 1]);
    }
    if (this.index[cell.row + 1]) {
      columnIndexes.push(this.index[cell.row + 1][cell.column - 1]);
      columnIndexes.push(this.index[cell.row + 1][cell.column]);
      columnIndexes.push(this.index[cell.row + 1][cell.column + 1]);
    }

    columnIndexes.forEach(i => {
      if (this.cells[i] && this.cells[i].alive) {
        neighbours += 1;
      }
    });

    return neighbours;
  }

  /***
   * Setting random start number with at least one cell from the edge
   */
  private setBlockFormation(): void {
    const startRow = Math.round(Math.random() * (this.grid.height - 4)) + 1;
    const startColumn = Math.round(Math.random() * (this.grid.width - 4)) + 1;

    this.cells
      .filter(c => (c.row === startRow || c.row === startRow + 1 || c.row === startRow + 2) &&
                  (c.column === startColumn || c.column === startColumn + 1 || c.column === startColumn + 2))
      .forEach(c => c.alive = true);
  }

  private setBeehiveFormation(): void {
    alert("Beehive formation not implemented");
  }

  private setRandomFormation(): void {
    this.cells
      .filter(c => Math.round(Math.random() * 100) > 20 ? false : true)
      .forEach(cell => cell.alive = true);
  }

  private setOscilliator(): void {
    const row = Math.floor(this.grid.height / 2);
    const col = Math.floor(this.grid.width / 2);

    this.cells
      .filter(c => c.column === col && (c.row === row - 1 || c.row === row || c.row === row + 1))
      .forEach(c => c.alive = true);
  }

  private setGlider(): void {
    const coordinates = [];
    coordinates.push({row: 0, col: 2});
    coordinates.push({row: 1, col: 0});
    coordinates.push({row: 1, col: 2});
    coordinates.push({row: 2, col: 1});
    coordinates.push({row: 2, col: 2});

    coordinates
      .map(c => this.index[c.row][c.col])
      .forEach(i => this.cells[i].alive = true);
  }
}
