import { API_URL } from '../environment';

type Config = Omit<RequestInit, 'body'> & { body?: object };

export function client<T>(endpoint: string, { body, ...customConfig }: Config = {}) {
  const headers: HeadersInit = { 'content-type': 'application/json' };
 
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window.fetch(`${API_URL}/${endpoint}`, config).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
