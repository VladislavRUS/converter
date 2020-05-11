import { API } from 'api/index';

class DealsApi {
  static fetchDeals = () => API.post('', { action: 'history' });
}

export { DealsApi };
