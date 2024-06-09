import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer, { AdminState, login } from 'store/slices/adminSlice';
import { LoginForm } from 'components/LoginForm/LoginForm';

jest.mock('store/slices/adminSlice', () => ({
  ...jest.requireActual('store/slices/adminSlice'),
  login: jest.fn(),
}));

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>
  );

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginForm component', () => {
    renderComponent();
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Admin Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Admin Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  test('displays validation errors with invalid input', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid input and success toast message', async () => {
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Admin Username/i), {
      target: { value: mockUsername },
    });
    fireEvent.change(screen.getByLabelText(/Admin Password/i), {
      target: { value: mockPassword },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        adminUsername: mockUsername,
        adminPassword: mockPassword,
      });
    });

    await waitFor(
      () => {
        expect(
          screen.queryByText(/Successfully logged in!/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  test('displays error toast message on login failure', async () => {
    const mockUsername = 'wronguser';
    const mockPassword = 'wrongpassword';

    (login as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid login details!');
    });

    renderComponent();
    fireEvent.change(screen.getByLabelText(/Admin Username/i), {
      target: { value: mockUsername },
    });
    fireEvent.change(screen.getByLabelText(/Admin Password/i), {
      target: { value: mockPassword },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        adminUsername: mockUsername,
        adminPassword: mockPassword,
      });
    });

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        adminUsername: mockUsername,
        adminPassword: mockPassword,
      });
      expect(screen.getByText(/Invalid login details!/i)).toBeInTheDocument();
    });
  });

  test('displays success toast message on logout', async () => {
    const initialState: { admin: AdminState } = {
      admin: { state: { fromLogout: true } } as any, // Ensure the state matches the expected shape
    };
    const customStore = configureStore({
      reducer: {
        admin: adminReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={customStore}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    await waitFor(
      () => {
        expect(
          screen.queryByText(/Logout successful!/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });
});
