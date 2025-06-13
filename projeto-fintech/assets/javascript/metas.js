document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.add-gasto-form');
    const nomeInput = document.querySelector('#nome');
    const descricaoInput = document.querySelector('#descricao');
    const valorInput = document.querySelector('#valor');
    const datainput = document.querySelector('#data');
    const gastosTabelaCorpo = document.querySelector('#gastosTabelaCorpo');
    const themeToggler = document.querySelector(".theme-toggler");

    form.addEventListener('submit', addGastos);

    function addGastos(event) {
        event.preventDefault();
        
        const nome = nomeInput.value;
        const descricao = descricaoInput.value;
        const valor = parseFloat(valorInput.value);
        const data = datainput.value;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nome}</td>
            <td>${descricao}</td>
            <td>R$ ${valor.toFixed(3)}</td>
            <td>${data}</td>
            <td class="actions">
                <button class="edit-button">Editar</button>
                <button class="delete-button"><span class="material-icons-sharp">delete</span></button>
            </td>
        `;

        gastosTabelaCorpo.appendChild(tr);
        form.reset();

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
                if (index < 4) {
                    const originalContent = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${originalContent}" style="width: 100%; box-sizing: border-box;" />`;
                }
            });
        } else {
            editButton.textContent = 'Editar';
            Array.from(tr.children).forEach((cell, index) => {
                if (index < 3) {
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
