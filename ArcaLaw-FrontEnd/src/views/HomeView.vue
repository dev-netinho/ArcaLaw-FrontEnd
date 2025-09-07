<template>
    
    <header class="header">
        <nav class="nav">
            <div class="logo">Arca Law</div>
            
            <ul class="nav-links">
                <li><a href="#">Boolean Studio</a></li>
                <li><a href="#">Planos e Preços</a></li>
                <li><a href="#">Funcionalidades</a></li>
            </ul>

            <router-link to="/login">
                <a class="login-btn">Login</a>
            </router-link>

            <button class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </nav>
    </header>

    <main class="main-content">
        <h1 class="title">Acompanhe Seu Caso</h1>
        <div class="form-container">
             <p class="subtitle">
            Insira Abaixo o Número do seu Processo, Entregue Pelo Advogado/Responsável Financeiro
        </p>
            <form id="caseForm">
                <div class="input-group">
                    <input 
                        type="text" 
                        class="input-field" 
                        placeholder="NÚMERO DO PROCESSO AQUI"
                        id="processNumber"
                        required
                    >
                </div>
                <button type="submit" class="submit-btn">Enviar</button>
            </form>
        </div>
        
    </main>
   </template>

    <script src="src/js/utils.js"></script>
    <script setup>
        document.addEventListener('DOMContentLoaded', () => {
            const userTypeSelection = document.getElementById('user-type-selection');
            const advogadoFormContainer = document.getElementById('advogado-form-container');
            const clienteFormContainer = document.getElementById('cliente-form-container');

            const selectAdvogadoBtn = document.getElementById('select-advogado');
            const selectClienteBtn = document.getElementById('select-cliente');

            [advogadoFormContainer, clienteFormContainer].forEach(panel => {
                panel.style.display = 'none';
                panel.style.opacity = '0';
            });
            userTypeSelection.style.opacity = '1';


            /**
             * @param {HTMLElement} panelToHide - Painel que será escondido
             * @param {HTMLElement} panelToShow - Painel que será exibido
             */
            function switchPanel(panelToHide, panelToShow) {
                panelToShow.style.display = 'block';

                const timeline = anime.timeline({
                    easing: 'easeOutExpo',
                    duration: 800 
                });

                timeline
                    .add({
                        targets: panelToHide,
                        opacity: [1, 0],
                        translateY: [0, -50], 
                        complete: () => {
                            panelToHide.style.display = 'none';
                        }
                    })
                    .add({
                        targets: panelToShow,
                        opacity: [0, 1],

                        translateY: [50, 0] 
                    }, '-=500'); 
            }

            selectAdvogadoBtn.addEventListener('click', () => {
                switchPanel(userTypeSelection, advogadoFormContainer);
            });

            selectClienteBtn.addEventListener('click', () => {
                switchPanel(userTypeSelection, clienteFormContainer);
            });
        });

        // Menu Mobile index
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

    </script>
