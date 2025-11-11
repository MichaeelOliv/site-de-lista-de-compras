   // Seleciona elementos principais
        const input = document.getElementById('adicionarItem');
        const btnAdicionar = document.getElementById('btnAdicionar');
        const lista = document.getElementById('listaCompras');

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
                    <button class="check-button">Selecione</button>
                    <span>${texto}</span>
                    <button class="delete-button">Excluir</button>
                </div>
            `;

            lista.appendChild(li);
            input.value = '';
            input.focus();
        }

        // Função para remover ou marcar item
        function manipularLista(e) {
            if (e.target.classList.contains('delete-button')) {
                e.target.closest('li').remove();
            }

            if (e.target.classList.contains('check-button')) {
                const item = e.target.closest('div.item');
                item.classList.toggle('selecionado');
                e.target.textContent = item.classList.contains('selecionado') ? 'Selecionado' : 'Selecione';
            }
        }

        // Eventos
        btnAdicionar.addEventListener('click', adicionarItem);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarItem();
        });
        lista.addEventListener('click', manipularLista);