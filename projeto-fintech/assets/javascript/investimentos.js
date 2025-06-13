
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.add-investimentos-form');
    const descricaoInput = document.querySelector('#descricao');
    const valorInput = document.querySelector('#valor');
    const dataInicioInput = document.querySelector('#dataInicio');
    const dataVencimentoInput = document.querySelector('#dataVencimento');
    const categoriaSelect = document.querySelector('#categoria');
    const investimentosTabelaCorpo = document.querySelector('#investimentosTabelaCorpo');
    const themeToggler = document.querySelector(".theme-toggler");


    function addInvestimento(event) {
        event.preventDefault();

        // valores do formulário
        const descricao = descricaoInput.value;
        const valor = parseFloat(valorInput.value).toFixed(2);
        const dataInicio = dataInicioInput.value;
        const dataVencimento = dataVencimentoInput.value;
        const categoria = categoriaSelect.value;

        // Adiciona o gasto à tabela
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${descricao}</td>
            <td>${categoria}</td>
            <td>R$ ${valor}</td>
            <td>${dataInicio}</td>
            <td>${dataVencimento}</td>
            <td class="actions">
                <button class="edit-button">Editar</button>
                <button class="delete-button"><span class="material-icons-sharp">delete</span></button>
            </td>
        `;

        // Adiciona nova linha a tabela
        investimentosTabelaCorpo.appendChild(tr);

        // Limpa os campos do formulário
        form.reset();

        // Adiciona funcionalidade aos botões de edição e exclusão
        const editButton = tr.querySelector('.edit-button');
        const deleteButton = tr.querySelector('.delete-button');

        editButton.addEventListener('click', () => toggleEdit(tr, editButton));
        deleteButton.addEventListener('click', () => tr.remove());
    }

    function toggleEdit(tr, editButton) {
        const isEditing = tr.classList.toggle('editing');

        if (isEditing) {
            editButton.textContent = 'Salvar';
            Array.from(tr.children).forEach((cell, index) => {
                if (index < 5) { // Ignora a célula de ações
                    const originalContent = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${originalContent}" style="width: 100%; box-sizing: border-box;" />`;
                }
            });
        } else {
            editButton.textContent = 'Editar';
            Array.from(tr.children).forEach((cell, index) => {
                if (index < 5) {
                    const input = cell.querySelector('input');
                    cell.textContent = input ? input.value : cell.textContent;
                }
            });
        }
    }

    // Mudar o tema
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');

        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    });

    // Adiciona evento de envio do formulário
    form.addEventListener('submit', addInvestimento);
});
