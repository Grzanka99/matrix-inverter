import { MatrixType } from '@/types';

export function deepCopyMatrix(m: MatrixType): MatrixType {
  const r = [];

  for (let i = 0; i < m.length; i++) {
    const t = [...m[i]];
    r.push(t);
  }

  return r;
}

export function calcMinor(
  matrix: MatrixType,
  x: number,
  y: number,
): MatrixType {
  const minor: MatrixType = [];
  const len = matrix.length;

  for (let i = 0; i < len; i++) {
    const t: Array<number> = [];
    for (let j = 0; j < len; j++) {
      if (i !== x && j !== y) {
        t.push(matrix[i][j]);
      }
    }
    if (t.length) minor.push(t);
  }

  return minor;
}

export function calcDet(m: MatrixType): number {
  let det = 1;

  const len = m.length;
  const matrix: MatrixType = deepCopyMatrix(m);

  for (let i = 0; i < len; i++) {
    if (!matrix[i][i]) return 0;
    det *= matrix[i][i];

    const row = [...matrix[i]];

    for (let j = i + 1; j < len; j++) {
      const nic = matrix[j][i];
      const factor = nic / matrix[i][i];

      const rminus = row.map((e) => e * factor);
      matrix[j] = matrix[j].map((e, k) => e - rminus[k]);
    }
  }

  const precision = 10000;
  return Math.round(det * precision) / precision;
}

export function calcAlgCompMatrix(m: MatrixType): MatrixType {
  const matrix = deepCopyMatrix(m);
  const len = matrix.length;
  const algCompMatrix: MatrixType = [];

  for (let i = 0; i < len; i++) {
    const t: Array<number> = [];
    for (let j = 0; j < len; j++) {
      const minor: MatrixType = calcMinor(matrix, i, j);
      const det = calcDet(minor);
      const rDet = det * (-1) ** (i + j);
      t.push(rDet);
    }

    algCompMatrix.push(t);
  }

  return algCompMatrix;
}
