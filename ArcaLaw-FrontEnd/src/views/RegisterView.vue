<template>
 
    <div class="form-container">
        <div class="form-wrapper">
            <h2>Cadastro de Advogado</h2>
            <p>Crie sua conta para começar.</p>
            
            <form id="signUpForm">
                <div class="input-group">
                    <i class="fas fa-user icon"></i>
                    <input type="text" id="fullName" placeholder="Nome Completo" required>
                </div>
                
                <div class="input-group">
                    <i class="fas fa-id-card icon"></i>
                    <input type="text" id="oab" placeholder="Nº da OAB" required>
                </div>

                <div class="input-group">
                    <i class="fas fa-envelope icon"></i>
                    <input type="email" id="email" placeholder="Email" required>
                </div>

                <div class="password-container input-group">
                    <i class="fas fa-lock icon"></i>
                    <input type="password" id="senha" placeholder="Senha" required>
                    <i class="fa-solid fa-eye icon-eye" id="toggle-senha"></i>
                </div>
                
                <div class="password-feedback">
                    <div id="password-strength-meter">
                        <div class="strength-bar"></div>
                    </div>
                    <div id="password-strength-tips"></div>
                </div>

                <div class="password-container input-group">
                    <i class="fas fa-lock icon"></i>
                    <input type="password" id="confirmar-senha" placeholder="Confirmar Senha" required>
                    <i class="fa-solid fa-eye icon-eye" id="toggle-confirmar-senha"></i>
                </div>

                <button type="submit" class="btn">Cadastrar</button>
            </form>
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script type="module" src="../js/route.js"></script>

</template>
<script setup>

import { showToast } from '../utils.js';
import { authService } from '../service/api.js';

    document.addEventListener('DOMContentLoaded', () => {
        const signUpForm = document.getElementById('signUpForm');
        if (!signUpForm) return;

        const passwordInput = document.getElementById('senha');
        const confirmPasswordInput = document.getElementById('confirmar-senha');
        const strengthMeter = document.querySelector('#password-strength-meter .strength-bar');
        const strengthTips = document.getElementById('password-strength-tips');

        const strengthCriteria = [
            { regex: /.{8,}/, message: "Pelo menos 8 caracteres" },
            { regex: /[A-Z]/, message: "Uma letra maiúscula" },
            { regex: /[a-z]/, message: "Uma letra minúscula" },
            { regex: /[0-9]/, message: "Pelo menos um número" },
            { regex: /[^A-Za-z0-9]/, message: "Pelo menos um caractere especial" }
        ];

        const updateStrengthUI = () => {
            let score = 0;
            let tipsHTML = '<ul>';
            strengthCriteria.forEach(criterion => {
                const isValid = criterion.regex.test(passwordInput.value);
                if (isValid) score++;
                tipsHTML += `<li class="${isValid ? 'valid' : 'invalid'}">${criterion.message}</li>`;
            });
            tipsHTML += '</ul>';
            strengthTips.innerHTML = tipsHTML;
            
            const strengthPercentage = (score / strengthCriteria.length) * 100;
            strengthMeter.style.width = `${strengthPercentage}%`;
            
            strengthMeter.className = 'strength-bar'; 
            if (score <= 2) strengthMeter.classList.add('weak');
            else if (score <= 4) strengthMeter.classList.add('medium');
            else strengthMeter.classList.add('strong');
        };

        if (passwordInput) {
            passwordInput.addEventListener('focus', () => strengthTips.style.display = 'block');
            passwordInput.addEventListener('input', updateStrengthUI);
        }

        function setupPasswordToggle(toggleId, inputId) {
            const toggleIcon = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            if (toggleIcon && input) {
                toggleIcon.addEventListener('click', () => {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    toggleIcon.classList.toggle('fa-eye-slash');
                });
            }
        }
        setupPasswordToggle('toggle-senha', 'senha');
        setupPasswordToggle('toggle-confirmar-senha', 'confirmar-senha');

        signUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const oab = document.getElementById('oab').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            const oabRegex = /^\d{1,6}[A-Z]?\/[A-Z]{2}$/i;
            if (!oabRegex.test(oab)) {
                showToast('Formato de OAB inválido. Use o padrão 123456/UF.', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showToast('As senhas não coincidem. Por favor, verifique.', 'error');
                return;
            }
            const isPasswordStrong = strengthCriteria.every(c => c.regex.test(password));
            if (!isPasswordStrong) {
                showToast('Por favor, crie uma senha forte seguindo todos os critérios.', 'error');
                return;
            }

            const userData = {
                nome: fullName, 
                oab: oab.toUpperCase(),
                email,
                password
            };

            try {
                const response = await authService.registerAdvogado(userData);
                const result = response.data;

                showToast('Cadastro realizado com sucesso! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = '/src/components/login.html'; 
                }, 2000);

            } catch (error) {
                console.error('Erro ao enviar o cadastro:', error);
                showToast(error.response?.data?.error || error.message, 'error');
            }
        });
    });

</script>