import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';

describe('Register email validation tests', () => {
  test('does not submit if email is invalid', async () => {
    const mockOnRegisterSuccess = jest.fn();

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Preenche os campos, mas com email inválido (sem @)
    await userEvent.type(screen.getByPlaceholderText(/nome completo/i), 'Nome Teste');
    await userEvent.type(screen.getByPlaceholderText(/nome de usuário/i), 'usuario123');
    await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'emailsemarroba.com');
    await userEvent.type(screen.getByPlaceholderText(/senha/i), 'senha123');

    const submitButton = screen.getByRole('button', { name: /registrar/i });

    await userEvent.click(submitButton);

    // Verifica que a função de sucesso NÃO foi chamada
    expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

    // Valida que o input de email está inválido
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInvalid();
  });
});
