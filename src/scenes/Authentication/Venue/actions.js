import { CALL_API } from '@middleware/api';

export const Venue = () => ({
  [CALL_API]: {
    endpoint: '/',
    authenticated: false,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({})
    },
    types: []
  }
});
