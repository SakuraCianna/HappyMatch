import { http } from '@kit.NetworkKit';
import { BACKEND_BASE_URL, BACKEND_REQUEST_TIMEOUT_MS } from './RemoteConfig';

interface RequestHeaders {
  'Content-Type': string;
  Authorization?: string;
}

export class BackendHttpClient {
  private authToken: string = '';

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  async get<T>(path: string): Promise<T | undefined> {
    return this.request<T>(path, http.RequestMethod.GET);
  }

  async post<T>(path: string, body?: Object): Promise<T | undefined> {
    return this.request<T>(path, http.RequestMethod.POST, body);
  }

  async put<T>(path: string, body?: Object): Promise<T | undefined> {
    return this.request<T>(path, http.RequestMethod.PUT, body);
  }

  async delete(path: string): Promise<boolean> {
    const result = await this.request<Object>(path, http.RequestMethod.DELETE);
    return result !== undefined;
  }

  private async request<T>(path: string, method: http.RequestMethod, body?: Object): Promise<T | undefined> {
    const request = http.createHttp();
    const header: RequestHeaders = {
      'Content-Type': 'application/json'
    };
    if (this.authToken.length > 0) {
      header.Authorization = `Bearer ${this.authToken}`;
    }
    try {
      const response = await request.request(`${BACKEND_BASE_URL}${path}`, {
        method,
        header,
        extraData: body ? JSON.stringify(body) : undefined,
        expectDataType: http.HttpDataType.OBJECT,
        connectTimeout: BACKEND_REQUEST_TIMEOUT_MS,
        readTimeout: BACKEND_REQUEST_TIMEOUT_MS,
        usingCache: false
      });
      if (response.responseCode >= 200 && response.responseCode < 300) {
        return response.result as T;
      }
    } catch (_error) {
      return undefined;
    } finally {
      request.destroy();
    }
    return undefined;
  }
}
