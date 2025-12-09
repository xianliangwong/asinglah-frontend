export interface LogInState {
  accessToken: string | null;
  status: 'pending' | 'success' | 'error';
  error: string | null;
  name: string | null;
}

export const initState: LogInState = {
  accessToken: null,
  status: 'pending',
  error: null,
  name: null,
};
