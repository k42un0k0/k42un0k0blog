import aspida from '@aspida/axios';
import api from '../../../api/$api';

export const planeApiClient = api(aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL }));

export type ApiClient = typeof planeApiClient;

export function createApiClientWithAuth(token: string): ApiClient {
  return api(
    aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL, headers: { Authorization: 'Bearer ' + token } })
  );
}
export function createApiClient(): ApiClient {
  return api(aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL }));
}
