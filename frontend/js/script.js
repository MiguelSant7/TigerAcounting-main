
// Header Responsivo
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');

    menuIcon.addEventListener('click', function () {
        sidebar.classList.toggle('show');
    });

    closeBtn.addEventListener('click', function () {
        sidebar.classList.remove('show');
    });
});

// Links Do botões por classe link-zap para levar ao whatsapp
document.querySelectorAll('.link-zap').forEach(button => {
    button.addEventListener('click', function() {
        // Cria um link temporário
        const a = document.createElement('a');
        a.href = 'https://api.whatsapp.com/send?phone=5531999867858&text=Seja%20bem%20vindo%20ao%20Tiger Accounting%20Contabilidade%20e%20consultoria.%20%C3%89%20um%20prazer%20falar%20com%20voc%C3%AA!%20%F0%9F%93%88%0A%0ADigite%20seu%20nome%20e%20a%20cidade%20de%20onde%20est%C3%A1%20falando%20que%20j%C3%A1%20vamos%20te%20atender.%20%F0%9F%A4%9D'; // Substitua com o URL desejado
        a.target = '_blank'; // Abre o link em uma nova aba
        a.rel = 'noopener noreferrer'; // Adiciona segurança
        // Simula um clique no link
        a.click();
    });
});

// Links Do botões por classe link-parceiro para levar ao banco cora
document.querySelectorAll('.link-parceiro').forEach(button => {
    button.addEventListener('click', function() {
        // Cria um link temporário
        const a = document.createElement('a');
        a.href = 'https://lp.cora.com.br/coraliados/?code=sertec-contabilidade-e-consultoria-ltda-&n=Sertec%20Contabilidade%20e%20Consultoria%20Ltda%20'; // Substitua com o URL desejado
        a.target = '_blank'; // Abre o link em uma nova aba
        a.rel = 'noopener noreferrer'; // Adiciona segurança
        // Simula um clique no link
        a.click();
    });
});

// Atualização de ano do copyright do footer
document.addEventListener("DOMContentLoaded", function() {
    var yearElement = document.getElementById("year");
    var currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});


// Animações de Entrada

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('view');
        } 
        // Sem o .remove fica apenas uma animação de primeiro carregamento
        // else {
        //     entry.target.classList.remove('view');
        // }
    });
});

const elements = document.querySelectorAll('.hidden');

elements.forEach((element) => myObserver.observe(element));



// Função para abrir e fechar modais
        function toggleModal(modalId, action) {
            const modal = document.getElementById(modalId);
            if (action === 'open') {
                modal.style.display = 'block';
            } else if (action === 'close') {
                modal.style.display = 'none';
            }
        }

        // Abrir e fechar o pop-up de Políticas de Privacidade
        document.getElementById('openPrivacy').addEventListener('click', function(event) {
            event.preventDefault();
            toggleModal('privacyModal', 'open');
        });

        document.getElementById('closePrivacy').addEventListener('click', function() {
            toggleModal('privacyModal', 'close');
        });

        // Abrir e fechar o pop-up de Termos de Uso
        document.getElementById('openTerms').addEventListener('click', function(event) {
            event.preventDefault();
            toggleModal('termsModal', 'open');
        });

        document.getElementById('closeTerms').addEventListener('click', function() {
            toggleModal('termsModal', 'close');
        });

        // Fechar o modal ao clicar fora dele
        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        });