   // Seleciona elementos principais
        const input = document.getElementById('adicionarItem');
        const btnAdicionar = document.getElementById('btnAdicionar');
        const lista = document.getElementById('listaCompras');

        // Atualiza o contador visível de itens
        function atualizarContador() {
            const total = lista.querySelectorAll('li').length;
            const comprados = lista.querySelectorAll('.item.selecionado').length;
            const cont = document.getElementById('contadorItens');
            cont.textContent = `Total: ${total} item${total !== 1 ? 's' : ''}` +
                              (total ? ` (${comprados} comprado${comprados !== 1 ? 's' : ''})` : '');
        }

        // Função para adicionar item
        function adicionarItem() {
            const texto = input.value.trim();
            if (texto === '') {
                alert('Digite o nome de um item.');
                return;
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item">
                    <button class="check-button" aria-label="Marcar como comprado">☐</button>
                    <span>${texto}</span>
                    <button class="delete-button" aria-label="Remover item">🗑️</button>
                </div>
            `;

            // efeito de surgimento
            li.style.opacity = '0';
            lista.appendChild(li);
            setTimeout(() => {
                li.style.transition = 'opacity 0.4s';
                li.style.opacity = '1';
            }, 10);

            input.value = '';
            input.focus();
            atualizarContador();
        }

        // Função para remover ou marcar item
        function manipularLista(e) {
            // exclusão com pequeno efeito
            if (e.target.classList.contains('delete-button')) {
                const li = e.target.closest('li');
                li.style.transition = 'opacity 0.3s';
                li.style.opacity = '0';
                setTimeout(() => {
                    li.remove();
                    atualizarContador();
                }, 300);
                return;
            }

            if (e.target.classList.contains('check-button')) {
                const item = e.target.closest('div.item');
                item.classList.toggle('selecionado');
                const marcado = item.classList.contains('selecionado');
                e.target.textContent = marcado ? '✅' : '☐';
                e.target.classList.toggle('selected', marcado);
                atualizarContador();
            }
        }

        // Eventos
        btnAdicionar.addEventListener('click', adicionarItem);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarItem();
        });
        lista.addEventListener('click', manipularLista);

        // inicializar contador
        atualizarContador();