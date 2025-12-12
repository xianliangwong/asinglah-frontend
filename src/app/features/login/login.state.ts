export interface LogInState {
  accessToken: string | null;
  status: string | null;
  error: string | null;
  name: string | null;
}

export const initState: LogInState = {
  accessToken: null,
  status: 'pending',
  error: null,
  name: null,
};
