import { formatNameToObject } from './formatNameToObject';

interface RequestData {
  url: string;
  body: {
    candidateId: string;
    row: number;
    column: number;
    direction?: string;
    color?: string;
  };
}

export function createRequestData(
  goal: string[][],
  diff: number[][],
  candidateId: string,
  baseUrl: string,
): RequestData[] {
  const requests = diff.map((row: number[], rowIndex: number) => {
    return row.map((col: number) => {
      const metadata = formatNameToObject(goal[rowIndex][col]);
      let endpoint: string;
      if (metadata?.color) {
        endpoint = 'soloons';
      } else if (metadata?.direction) {
        endpoint = 'comeths';
      } else {
        endpoint = 'polyanets';
      }
      return {
        url: `${baseUrl}/${endpoint}`,
        body: { candidateId, row: rowIndex, column: col, ...metadata },
      };
    });
  });

  return requests.flat();
}
