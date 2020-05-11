import { API } from 'api/index';

class QuoteApi {
  static fetchQuotes = () => API.post('', { action: 'quote' });
}

export { QuoteApi };
