/**
 * Service d'accès à une API distante.
 * Dépend de `fetch` (global) : en test, on remplacera fetch par un mock
 * pour ne jamais faire de vraie requête réseau.
 */

export type User = {
  id: number;
  name: string;
  email: string;
};

export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
  }
}

const BASE_URL = 'https://api.example.com';

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new HttpError(response.status);
  return (await response.json()) as User;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new HttpError(response.status);
  return (await response.json()) as User[];
}
