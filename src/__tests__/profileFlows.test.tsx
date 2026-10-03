import React from 'react';
import '@testing-library/jest-dom/jest-globals';
import { beforeEach, afterEach, expect, jest, test } from '@jest/globals';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from '@/pages/Auth';
import Favorites from '@/pages/Favorites';
import Settings from '@/pages/Settings';
import TeamProfile from '@/pages/TeamProfile';
import RaceProfile from '@/pages/RaceProfile';
import { races2024, races2025, races2026 } from '@/data/wecData';

const mockNavigate = jest.fn();
const mockErrorToast = jest.fn();
const mockSuccessToast = jest.fn();
const mockUpdate = jest.fn();
const mockInsert = jest.fn();
const mockEq = jest.fn();
let mockUser: { id: string; user_metadata: { username?: string } } | null;
let mockRouteId = 'toyota-7';
let mockReplies: Record<string, { data: unknown; error: { code: string; message: string } | null }>;
const mockRefreshProfile = jest.fn();
const mockProfile = { marketing_emails: true };
const mockAuthSignUp = jest.fn(async () => ({ data: { session: null }, error: null }));

jest.mock('@/integrations/supabase/client', () => ({ supabase: {
  auth: {
    signUp: (...args: Parameters<typeof mockAuthSignUp>) => mockAuthSignUp(...args),
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: (table: string) => {
    let updating = false;
    const query = {
      select: () => query,
      eq: (...args: unknown[]) => { mockEq(...args); return query; },
      update: (...args: unknown[]) => { updating = true; mockUpdate(...args); return query; },
      insert: (...args: unknown[]) => { mockInsert(...args); return query; },
      single: () => Promise.resolve(mockReplies[updating ? `${table}:update` : table]),
      then: (resolve: (value: unknown) => unknown) => Promise.resolve(mockReplies[updating ? `${table}:update` : table]).then(resolve),
    };
    return query;
  },
}}));
jest.mock('@/contexts/AuthContext', () => ({ useAuth: () => ({
  user: mockUser, loading: false, profile: mockProfile, refreshProfile: mockRefreshProfile,
}) }));
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { from: '/favorites' } }),
  useParams: () => ({ id: mockRouteId }),
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
jest.mock('@/components/Header', () => () => null);
jest.mock('@/components/SEOHead', () => () => null);
jest.mock('@/components/BackButton', () => () => null);
jest.mock('@/hooks/useTeamProfile', () => ({ useTeamProfile: () => ({ data: null }) }));
jest.mock('@/hooks/useTimezone', () => ({
  useTimezone: () => ({ timezone: 'local', convertTime: (_date: string, time: string) => time }),
  useTimeFormat: () => ({ timeFormat: '24h' }), TIMEZONE_OPTIONS: [],
}));
jest.mock('sonner', () => ({ toast: { error: (...args: unknown[]) => mockErrorToast(...args), success: (...args: unknown[]) => mockSuccessToast(...args) } }));
jest.mock('react-toastify', () => ({ toast: { error: (...args: unknown[]) => mockErrorToast(...args), success: (...args: unknown[]) => mockSuccessToast(...args) } }));

const failure = { code: '42501', message: 'Permission denied' };
const missing = { code: 'PGRST116', message: 'No rows' };
function mount(element: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return render(<QueryClientProvider client={client}>{element}</QueryClientProvider>);
}
beforeEach(() => {
  jest.clearAllMocks();
  mockUser = { id: 'new-user', user_metadata: { username: 'racer' } };
  mockRouteId = 'toyota-7';
  mockReplies = {
    profiles: { data: { username: null }, error: null },
    'profiles:update': { data: { id: 'profile-id' }, error: null },
    favorite_teams: { data: null, error: missing },
    notification_subscriptions: { data: null, error: missing },
    drivers: { data: [], error: null },
  };
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => { cleanup(); jest.restoreAllMocks(); });

test('profile update uses the authenticated user and failed writes remain retryable', async () => {
  mockReplies['profiles:update'] = { data: null, error: failure };
  mount(<Auth />);
  const retry = await screen.findByRole('button', { name: 'Retry saving profile' });
  expect(mockEq).toHaveBeenCalledWith('user_id', 'new-user');
  expect(mockUpdate).toHaveBeenCalledWith({ username: 'racer' });
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(mockSuccessToast).not.toHaveBeenCalled();
  mockReplies['profiles:update'] = { data: { id: 'profile-id' }, error: null };
  fireEvent.click(retry);
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/favorites', { replace: true }));
});

test('profile lookup failures also prevent navigation and existing usernames are preserved', async () => {
  mockReplies.profiles = { data: null, error: failure };
  mount(<Auth />);
  const retry = await screen.findByRole('button', { name: 'Retry saving profile' });
  expect(mockUpdate).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  mockReplies.profiles = { data: { username: 'edited-name' }, error: null };
  fireEvent.click(retry);
  await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  expect(mockUpdate).not.toHaveBeenCalled();
});

test('a signup without an authenticated user cannot update a profile', () => {
  mockUser = null;
  mount(<Auth />);
  expect(mockUpdate).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
});

test('favorites failures show a retry action and recover to the returned list', async () => {
  mockReplies.favorite_teams = { data: null, error: failure };
  mount(<Favorites />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Failed to load favorites');
  mockReplies.favorite_teams = { data: [{ id: 'fav', team_id: 'toyota-7', team_name: 'Toyota', car_class: 'HYPERCAR' }], error: null };
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  expect(await screen.findByText('Toyota')).toBeInTheDocument();
});

test('notification failures hide defaults; missing settings use defaults after retry', async () => {
  mockReplies.notification_subscriptions = { data: null, error: failure };
  mount(<Settings />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Failed to load notification settings');
  expect(screen.getAllByRole('switch')).toHaveLength(1);
  mockReplies.notification_subscriptions = { data: null, error: missing };
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  await waitFor(() => expect(screen.getAllByRole('switch')).toHaveLength(4));
  expect(screen.getAllByRole('switch')[1]).toHaveAttribute('aria-checked', 'true');
  expect(screen.getAllByRole('switch')[3]).toHaveAttribute('aria-checked', 'false');
});

test('marketing consent rolls back on profileError and refreshes on success', async () => {
  mockReplies['profiles:update'] = { data: null, error: failure };
  mount(<Settings />);
  const marketing = screen.getAllByRole('switch')[0];
  fireEvent.click(marketing);
  await waitFor(() => expect(mockErrorToast).toHaveBeenCalledWith('Failed to update privacy preferences'));
  expect(marketing).toHaveAttribute('aria-checked', 'true');
  expect(mockRefreshProfile).not.toHaveBeenCalled();
  mockReplies['profiles:update'] = { data: { id: 'profile-id' }, error: null };
  fireEvent.click(marketing);
  await waitFor(() => expect(mockRefreshProfile).toHaveBeenCalled());
  expect(marketing).toHaveAttribute('aria-checked', 'false');
});

test('team lookup errors block adding; PGRST116 enables adding after retry', async () => {
  mockReplies.favorite_teams = { data: null, error: failure };
  mount(<TeamProfile />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Failed to check favorite status');
  const add = screen.getByRole('button', { name: 'Add to Favorites' });
  expect(add).toBeDisabled();
  fireEvent.click(add);
  expect(mockInsert).not.toHaveBeenCalled();
  mockReplies.favorite_teams = { data: null, error: missing };
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  await waitFor(() => expect(add).toBeEnabled());
});

test.each([...races2024, ...races2025, ...races2026].map(race => [race.id, race.name]))('race route %s renders', (id, name) => {
  mockRouteId = id;
  mount(<RaceProfile />);
  expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
});


test('signup sends username metadata and returns a confirmation flow without a session', async () => {
  const { AuthProvider, useAuth } = jest.requireActual<typeof import('@/contexts/AuthContext')>('@/contexts/AuthContext');
  const completed = jest.fn();
  function SignupProbe() {
    const { signUp } = useAuth();
    return <button onClick={() => void signUp('racer@example.com', 'password', 'Racer', 'racer').then(completed)}>Signup</button>;
  }
  mount(<AuthProvider><SignupProbe /></AuthProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Signup' }));
  await waitFor(() => expect(completed).toHaveBeenCalledWith({ error: null, session: null }));
  expect(mockAuthSignUp).toHaveBeenCalledWith({
    email: 'racer@example.com', password: 'password',
    options: { emailRedirectTo: `${window.location.origin}/auth`, data: { display_name: 'Racer', username: 'racer' } },
  });
  expect(mockUpdate).not.toHaveBeenCalled();
});
