import getDroneInfo from './getDroneInfo.js';
import 'isomorphic-fetch';

describe('#getDroneInfo() using fetch', () => {
  it('should get the latest drone information', async () => {
    const droneData = await getDroneInfo();
    expect(droneData).toBeDefined();
    expect(droneData).toHaveProperty('data');
  });
});
