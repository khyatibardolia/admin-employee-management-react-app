import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginForm } from 'components/LoginForm/LoginForm';

const mockStore = configureStore([]);

describe('LoginForm', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      admin: {
        isLoggedIn: false,
      },
    });
  });

  test('renders Admin Login text', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    const adminLoginText = screen.getByText(/Admin Login/i);
    expect(adminLoginText).toBeInTheDocument();
  });
});
