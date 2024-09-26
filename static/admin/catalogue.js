// Filtering item table
const searchInput = document.querySelector('#searchInput');
const categorySelect = document.querySelector('#categorySelect');
const tableBody = document.querySelector('#tableBody');


const allItems = tableBody.innerHTML;

// Filters table according to the predicate, by using css to hide row elements.
function filterItems(predicate) {

    tableBody.innerHTML = allItems;
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach((row) => {
        const fields = row.querySelectorAll('td');
        const itemName = fields[1].textContent.toLowerCase();
        const itemCategory = fields[2].textContent;
        const categoryId = fields[2].getAttribute('data-category-id');

        if (predicate(itemName, itemCategory, categoryId)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }

    });
}


// Predicate function to filter both by search and select input values
function ByNameAndCategory(itemName, itemCategory, categoryId) {
    const searchedText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const nameMatches = itemName.toLowerCase().includes(searchedText);
    const categoryMatches = selectedCategory === categoryId || selectedCategory === '';

    return nameMatches && categoryMatches;
}

searchInput.addEventListener('input', () => filterItems(ByNameAndCategory));
categorySelect.addEventListener('change', () => filterItems(ByNameAndCategory));
//-------------------------------------------------------------------------------



// Dynamically adding item details fields to the new item form
const newItemForm = document.querySelector('#newItemForm');
const addDetailBtn = newItemForm.querySelector('#addDetailBtn');
const detailsContainer = newItemForm.querySelector('#detailsContainer');

function addDetailFields(container) {
    const detailFields = document.createElement('div');
    detailFields.classList.add('mb-3', 'input-group');
    detailFields.innerHTML =
        `<input type="text" class="form-control" placeholder="Detail Name" required>
        <input type="text" class="form-control" placeholder="Detail Value" required>
        <button type="button" class="btn btn-danger remove-detail">
            <i class="bi bi-trash"></i>
        </button>`;

    container.appendChild(detailFields);
    detailFields.querySelector('.remove-detail').addEventListener('click', () => {
        container.removeChild(detailFields);
    });
}

addDetailBtn.addEventListener('click', () => addDetailFields(detailsContainer));
//----------------------------------------------------------------------------------


// Logout button handler
document.querySelector('#logout-btn')
    .addEventListener('click', async (e) => {
        try {
            const response = await fetch('http://localhost:3000/authentication/logout', {
                method: 'POST',
            });

            if (response.ok) {
                console.log('Logout succeeded.');
                window.location.href = '/';
            } else {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
        }
    });


// Add new item event handler
newItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var newItem = {
        name: newItemForm.querySelector('#itemName').value,
        categoryId: newItemForm.querySelector('#itemCategory').value,
        details: []
    };

    const inputGroup = newItemForm.querySelectorAll('.input-group');

    for (let i = 0; i < inputGroup.length; i++) {
        let detailInputs = inputGroup[i].querySelectorAll('input');

        newItem.details.push({
            detail_name: detailInputs[0].value,
            detail_value: detailInputs[1].value
        });
    }

    try {
        const response = await fetch('http://localhost:3000/admin/createItem', {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: { "Content-Type": "application/json" },

        });

        if (response.ok) {
            location.reload();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }

});
//----------------------------------------------------------------------------------


// Delete item event handler
tableBody.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-item')) {
        const itemId = e.target.closest('button').dataset.id;

        if (confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:3000/admin/deleteItem/${itemId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    //const currentCategory = document.querySelector('#categorySelect').value;
                    //window.location.href = `/admin/catalogue?category=${currentCategory}`;

                    window.location.reload();
                    //categorySelect.value = e.target.closest('.categoryCell').dataset.categoryId;
                    //console.log(categorySelect.value);
                } else {
                    throw new Error(`Response status: ${response.status}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});
//----------------------------------------------------------------------------------

// Edit item event handler
tableBody.addEventListener('click', async (e) => {
    if (e.target.closest('.edit-item')) {
        const itemId = e.target.closest('button').dataset.id;
        try {
            const response = await fetch(`http://localhost:3000/admin/getItem/${itemId}`);

            if (response.ok) {
                const item = await response.json();
                showEditModal(item);
            } else {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
});


function showEditModal(item) {
    const modal = new bootstrap.Modal(document.querySelector('#editItemModal'));
    const form = document.querySelector('#editItemForm');
    const addDetailBtn = form.querySelector('#addDetailBtn');
    const detailsContainer = form.querySelector('#detailsContainer');

    detailsContainer.innerHTML = '';

    // event for adding extra detail fields
    addDetailBtn.addEventListener('click', () => addDetailFields(detailsContainer));

    // adding existing details to the form
    form.querySelector('#itemName').value = item.itemName;
    form.querySelector('#itemCategory').value = item.categoryId;

    console.log(item.details);
    //console.log(details);

    for (let detail of item.details) {
        addDetails(detailsContainer, detail.detail_name, detail.detail_value);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedItem = {
            name: form.querySelector('#itemName').value,
            categoryId: form.querySelector('#itemCategory').value,
            details: []
        };

        const inputGroup = form.querySelectorAll('.input-group');

        for (let i = 0; i < inputGroup.length; i++) {
            let detailInputs = inputGroup[i].querySelectorAll('input');

            updatedItem.details.push({
                detail_name: detailInputs[0].value,
                detail_value: detailInputs[1].value
            });
        }

        try {
            const response = await fetch(`http://localhost:3000/admin/updateItem/${item.itemId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedItem),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                modal.hide();
                window.location.reload();
            } else {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    });

    modal.show();
}

function addDetails(container, name = '', value = '') {
    const detailFields = document.createElement('div');
    detailFields.classList.add('mb-3', 'input-group');
    detailFields.innerHTML = `
        <input type="text" class="form-control" name="detail_name" value="${name}" placeholder="Detail Name" required>
        <input type="text" class="form-control" name="detail_value" value="${value}" placeholder="Detail Value" required>
        <button type="button" class="btn btn-danger remove-detail">
            <i class="bi bi-trash"></i>
        </button>`;

    container.appendChild(detailFields);
    detailFields.querySelector('.remove-detail').addEventListener('click', () => {
        container.removeChild(detailFields);
    });
}

//----------------------------------------------------------------------------------

const addCategoryForm = document.querySelector('#addCategoryForm');

addCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
})