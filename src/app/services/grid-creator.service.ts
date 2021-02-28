import { CellHandler } from './cell-handler.service';
import { Cell } from './../model/cell';
import { Grid } from './../model/grid';
import { Injectable } from '@angular/core';
import { flatten } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GridCreatorService {

  constructor(private cellHandler: CellHandler) { }

  createGrid(grid: Grid): Array<Cell> {
    this.setWidth(grid.width);
    return this.createCells(grid);
  }

  private createCells(grid: Grid): Array<Cell> {
    const cellsToCreate = grid.height * grid.width;
    const container = document.getElementById("mainGrid");
    const cells: Array<Cell> = [];

    for (let i = 0; i < cellsToCreate; i++) {
      const row: number = Math.floor(i / grid.width);
      const cell: Cell = {
        id: i,
        alive: false,
        column: i - (row * grid.width),
        row,
        survives: undefined
      };

      const div = document.createElement("div");
      div.setAttribute("class", "grid-item");
      div.setAttribute("id", this.cellHandler.getId(cell));
      div.style.height = Math.round(100 / grid.height) + "vh";
      container.appendChild(div);

      cells.push(cell);
    }

    return cells;
  }

  private setWidth(width: number): void {
    let columns = "";
    for (let i = 0; i < width; i++) {
      columns += "auto ";
    }
    document.getElementById("mainGrid")
      .style
      .gridTemplateColumns = columns.trim();
  }
}
