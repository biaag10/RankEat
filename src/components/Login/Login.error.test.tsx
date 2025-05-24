import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';

jest.mock('../../actions/index', () => ({
  loginUser: jest.fn(),
}));

import { loginUser } from '../../actions/index';

describe('Login error tests', () => {
  test('shows error message on failed login', async () => {
    const mockOnLoginSuccess = jest.fn();

    (loginUser as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Usuário ou senha incorretos',
    });

    render(<Login onLoginSuccess={mockOnLoginSuccess} />);

    await userEvent.type(screen.getByPlaceholderText(/e-mail ou nome de usuário/i), 'usuario_errado');
    await userEvent.type(screen.getByPlaceholderText(/senha/i), 'senha_errada');

    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    const errorMessage = await screen.findByText(/usuário ou senha incorretos/i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });
});
