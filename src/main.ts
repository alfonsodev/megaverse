import 'dotenv/config';

import { createDiffMap } from './createDiffMap';
import { MegaverseApiClient } from './client';

(async function main(): Promise<void> {
  try {
    const candidateId = process.env['CANDIDATE_ID'];
    const baseUrl = process.env['BASE_URL'];

    const client = new MegaverseApiClient(baseUrl, candidateId);
    const state = await client.getCurrentMapState();
    const goal = await client.getCurrentGoal();
    if (goal) {
      const diffMap: number[][] = createDiffMap(goal, state);
      const requestsData = client.createRequestData(goal, diffMap);
      await client.postObjects(requestsData, 10);
    }
    console.log('All objects posted successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
