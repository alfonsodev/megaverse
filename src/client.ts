import { parseStateToGoalFormat } from './parseStateToGoalFormat';
import retry from 'async-retry';
import pLimit from 'p-limit';

interface RequestData {
  url: string;
  body: { row: number; column: number; direction?: string; color?: string };
}

interface GetCurrentGoalResponseData {
  goal: string[][];
}

export interface MegaverseState {
  direction?: string;
  color?: string;
  type: number;
}

interface GetCurrentMapStateResponseData {
  map: { content: MegaverseState[][] };
}

export class MegaverseApiClient {
  constructor(
    private baseUrl: string,
    private candidateId: string,
  ) {}

  async getCurrentGoal(): Promise<string[][]> {
    const response = await fetch(`${this.baseUrl}/map/${this.candidateId}/goal`);
    const data = (await response.json()) as GetCurrentGoalResponseData;
    return data?.goal;
  }

  async getCurrentMapState(): Promise<string[][]> {
    const response = await fetch(`${this.baseUrl}/map/${this.candidateId}`);
    const data = (await response.json()) as GetCurrentMapStateResponseData;
    return parseStateToGoalFormat(data?.map?.content);
  }

  static async postObject(requestData: RequestData): Promise<void> {
    await retry(
      async (bail) => {
        const response = await fetch(requestData.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData.body),
        });

        if (response.ok) {
          console.log('Request succeeded:', requestData);
        } else {
          // For non-retryable errors, bail out of retrying
          if (response.status === 400) {
            bail(new Error('Bad request, won’t retry'));
          }
          throw new Error('Request failed with status: ' + response.status);
        }
      },
      {
        retries: 5,
        onRetry: (error, attempt) => {
          console.log(`Attempt ${attempt}: Retrying after error`, error.message);
        },
      },
    );
  }

  async postObjects(objects: RequestData[], concurrencyLimit: number = 10): Promise<void> {
    const limit = pLimit(concurrencyLimit);
    const promises = objects.map((object) => limit(() => MegaverseApiClient.postObject(object)));
    await Promise.all(promises);
  }
}
