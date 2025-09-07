<template>

    <div class="form-container">
        <div class="form-wrapper">
            <h2>Login</h2>
            <p>Bem-vindo de volta!</p>
            
            <form id="loginForm">
                <div class="input-group">
                    <i class="fas fa-envelope icon"></i>
                    <input type="email" id="email" placeholder="Email" required>
                </div>

                <div class="password-container input-group">
                    <i class="fas fa-lock icon"></i>
                    <input type="password" id="password" placeholder="Senha" required>
                    <i class="fa-solid fa-eye icon-eye" id="toggle-password"></i>
                </div>
                
                <button type="submit" class="btn">Entrar</button>
            </form>
            
            <div class="redirect-link">
                <p>Não tem uma conta? <a href="../components/register.html">Cadastre-se</a></p>
            </div>
        </div>
    </div>

</template>
<script setup>

    import { showToast } from '../utils.js';
    import { authService } from '@/service/api.js';

        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');

            if (!loginForm) {
                console.error("DEBUG: Erro crítico! Não foi possível encontrar o elemento com o ID 'loginForm'. Verifique o seu HTML.");
                return;
            }

            // Lógica de Visibilidade da Senha
            const toggleIcon = document.getElementById('toggle-password');
            const passwordInput = document.getElementById('password');
            if (toggleIcon && passwordInput) {
                toggleIcon.addEventListener('click', () => {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    toggleIcon.classList.toggle('fa-eye-slash');
                });
            }

            // Lógica de Envio do Formulário de Login
            loginForm.addEventListener('submit', async function(event) {
                event.preventDefault();

                const emailInput = document.getElementById('email');
                const email = emailInput.value;
                const password = passwordInput.value;

                if (!email || !password) {
                    showToast('Por favor, preencha o e-mail e a senha.', 'error');
                    return;
                }

                const userData = { email, password };

                showToast('A autenticar...', 'loading');
                try {
                    const response = await authService.login(userData);
                    const result = response.data;

                    showToast('Login efetuado com sucesso! A redirecionar...', 'success');
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('userData', JSON.stringify(result.user));
                    setTimeout(() => {
                        window.location.href = '../components/dashboard.html';
                    }, 2000);

                } catch (error) {
                    console.error('Erro no login:', error);
                    showToast(error.response?.data?.error || error.message, 'error');
                }
            });
        });
</script>