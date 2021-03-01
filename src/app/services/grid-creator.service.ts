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
    document.getElementById("mainGrid")
      .style
      .gridTemplateColumns = this.setWidth(grid.width);
    const cells = this.createCells(grid);
    this.createHtmlElements(cells, grid);

    return cells;
  }

  private createCells(grid: Grid): Array<Cell> {
    const cellsToCreate = grid.height * grid.width;
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

      cells.push(cell);
    }

    return cells;
  }

  private createHtmlElements(cells: Array<Cell>, grid: Grid): void {
    const container = document.getElementById("mainGrid");

    cells.forEach(cell => {
      const div = document.createElement("div");

      div.setAttribute("class", "grid-item");
      div.setAttribute("id", this.cellHandler.getId(cell));
      div.style.height = Math.round(100 / grid.height) + "vh";

      container.appendChild(div);
    });
  }

  private setWidth(width: number): string {
    let columns = "";
    for (let i = 0; i < width; i++) {
      columns += "auto ";
    }
    return columns.trim();
  }
}
