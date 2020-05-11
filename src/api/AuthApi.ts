import { API } from 'api/index';
import { LoginFormData } from 'store/auth/types';

class AuthApi {
  static login = (data: LoginFormData) => API.post('', { action: 'login', ...data });
}

export { AuthApi };
