import { MatrixType } from '@/types';
import {
  calcAlgCompMatrix,
  calcDet,
  generateExtendedMatrix,
  extendedGauss,
} from '@/lib/utils';

export class Matrix {
  size: number;

  private _matrix: MatrixType = [];

  private _det = 0;

  constructor(size: number) {
    this.size = size;
    this._matrix = this.createMatrix();
  }

  private createMatrix(): MatrixType {
    const m: MatrixType = [];

    for (let i = 0; i < this.size; i++) {
      const im: Array<number> = [];
      for (let j = 0; j < this.size; j++) {
        im.push(0);
      }
      m.push(im);
    }

    return m;
  }

  public fillWithRandomValues(): void {
    const m: MatrixType = [];

    for (let i = 0; i < this.size; i++) {
      const im: Array<number> = [];
      for (let j = 0; j < this.size; j++) {
        // eslint-disable-next-line
        const random =
          i === j
            ? Math.random() * 100 + 1
            : Math.random() * 100;
        im.push(random);
      }
      m.push(im);
    }

    this._matrix = m;
  }

  public clearMatrix(): void {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this._matrix[i][j] = 0;
      }
    }
  }

  private resizeMatrix(): MatrixType {
    const m: MatrixType = this._matrix;
    if (this.size > m.length) {
      for (let i = 0; i < this.size; i++) {
        const im = m[i] ? m[i] : [];
        for (let j = im.length; j < this.size; j++) {
          im.push(0);
        }
        m[i] = im;
      }
    } else {
      for (let i = m.length; i > 0; i--) {
        const im = m[i - 1] ? m[i - 1] : [];
        for (let j = im.length; j > this.size; j--) {
          im.pop();
        }
        if (m.length > this.size) m.pop();
      }
    }
    return m;
  }

  public invertMatrixWithGauss(): MatrixType {
    this._det = calcDet(this._matrix);

    if (this._det === 0) {
      return [[502]];
    }

    const r = (v: number) => {
      const precision = 10000;
      return Math.round(v * precision) / precision;
    };

    const m = calcAlgCompMatrix(this._matrix);
    const iM: MatrixType = [];
    const len = m.length;

    for (let j = 0; j < len; j++) {
      const t: Array<number> = [];
      for (let i = 0; i < len; i++) {
        t.push(r(m[i][j] / this._det));
      }
      iM.push(t);
    }

    return iM;
  }

  public inverMatrixByEquations(): MatrixType {
    const matrix: MatrixType = [];
    let m: MatrixType = generateExtendedMatrix(this._matrix);
    m = extendedGauss(m);

    if (m.length === 1 && m[0].length === 1) {
      return m;
    }

    for (let i = 0; i < this.size; i++) {
      const row: Array<number> = [];
      for (let j = 0; j < this.size; j++) {
        let x: number;
        x = m[i * this.size + j][m.length - 1];
        x /= m[i * this.size + j][i * this.size + j];

        x = x + 1 - 1;

        const precision = 10000;
        x = Math.round(x * precision) / precision;

        row.push(x);
      }

      matrix.push(row);
    }

    return matrix;
  }

  public setValue(row: number, col: number, val = 0) {
    this._matrix[row][col] = val;
  }

  public set updateSize(size: number) {
    this.size = size;
    this._matrix = this.resizeMatrix();
  }

  public get matrix(): MatrixType | boolean {
    return this._matrix;
  }

  public run() {
    console.log(this.inverMatrixByEquations());
  }
}
