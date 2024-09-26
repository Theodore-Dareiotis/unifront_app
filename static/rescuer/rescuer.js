// .............API REQUESTS..............
async function fetchCargo() {
    try {
        const response = await fetch(`http://localhost:3000/rescuer/getCargo`);

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchBaseInventory() {
    try {
        const response = await fetch(`http://localhost:3000/rescuer/getBaseInventory`);

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadItems(items) {
    try {
        const response = await fetch('/rescuer/loadItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items })
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}


// ............DOM RELATED..................
var cargo = [];
var baseInventory = [];
const cargoSection = document.querySelector('#cargo-section');
const taskSection = document.querySelector('#task-section');

function filterItems(item, searchText, selectedCategories) {
    const nameMatches = item.itemName.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatches = selectedCategories.length === 0 || selectedCategories[0] === '' || selectedCategories.includes(item.categoryId.toString());
    return nameMatches && categoryMatches;
}

function populateCargo() {
    const searchInput = cargoSection.querySelector('.searchInput');
    const categorySelect = cargoSection.querySelector('.categorySelect');
    const searchedText = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    cargo.forEach((item, index) => {
        if (filterItems(item, searchedText, selectedCategories)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.categoryName}</td>
            <td>${item.quantity}</td>
            <td>
                <button class="btn btn-primary btn-sm show-details collapsed" 
                data-bs-toggle="collapse" data-bs-target="#itemDetails${index}">
                Details
                </button>
            </td>
            `;
            tableBody.appendChild(tr);
            const dtls = document.createElement('tr');
            dtls.innerHTML = `
            <td colspan="4" class="p-0">
                <div class="collapse" id="itemDetails${index}">
                    <div class="card card-body my-1">
                        ${item.details.map(detail => `
                        <div><strong>${detail.detail_name}:</strong> ${detail.detail_value}</div>`).join('')}
                    </div>
                </div>
            </td>`;
            tableBody.appendChild(dtls);
        }
    });
}

function populateLoadCargoModal() {
    const modal = document.querySelector('#loadCargoModal');
    const tableBody = modal.querySelector('tbody');
    const searchInput = modal.querySelector('.searchInput');
    const categorySelect = modal.querySelector('.categorySelect');

    const searchedText = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);

    tableBody.innerHTML = '';

    baseInventory.forEach((item, index) => {
        if (filterItems(item, searchedText, selectedCategories)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>
                <button type="button" class="btn addItemBtn btn-primary btn-sm" data-item-id="${item.itemId}">
                    <i class="bi bi-plus"></i>
                </button>
            </td>
            <td class="nameCell">${item.itemName}</td>
            <td>${item.categoryName}</td>
            <td>
                <input type="number" class="form-control form-control-sm" name="quantity_${item.itemID}" min="1" value="1">
            </td>
            <td>
                <button type="button" class="btn btn-primary btn-sm show-details collapsed"
                    data-bs-toggle="collapse" data-bs-target="#catalogueDetails${index}">
                    Details
                </button>
            </td>
            `;

            tableBody.appendChild(tr);
            const dtls = document.createElement('tr');
            dtls.innerHTML = `
      <td colspan="4" class="p-0">
        <div class="collapse" id="catalogueDetails${index}">
          <div class="card card-body my-1">
            ${item.details.map(detail => `
            <div><strong>${detail.detail_name}:</strong> ${detail.detail_value}</div>`).join('')}
          </div>
        </div>
      </td>`;
            tableBody.appendChild(dtls);
        }
    });
}



function renderLoadCargoModal() {
    const modal = document.querySelector('#loadCargoModal');
    const bsModal = new bootstrap.Modal(modal);

    const selectedItems = new Map();
    const itemBadgeList = modal.querySelector('.itemBadgeList');
    modal.querySelector('.modal-body').addEventListener('click', (e) => {
        if (e.target.closest('.addItemBtn')) {
            const itemId = e.target.closest('.addItemBtn').dataset.itemId;
            const itemName = e.target.closest('tr').querySelector('.nameCell').innerText;
            const itemQuantity = e.target.closest('tr').querySelector('input[type="number"]').value;

            if (!selectedItems.has(itemId)) {
                const badge = document.createElement('button');
                badge.classList.add('badge', 'rounded-pill', 'text-bg-secondary');
                badge.setAttribute('data-item-id', itemId);
                badge.innerHTML = `${itemName} (${itemQuantity})`;
                itemBadgeList.appendChild(badge);

                selectedItems.set(itemId, {
                    name: itemName,
                    quantity: itemQuantity
                });
            } else if (selectedItems[itemId] != itemQuantity) {
                const badge = itemBadgeList.querySelector(`button[data-item-id="${itemId}"]`);
                badge.innerHTML = `${itemName} (${itemQuantity})`;
            }
        }

        if (e.target.closest('.badge')) {
            const itemId = e.target.dataset.itemId;
            selectedItems.delete(itemId);
            itemBadgeList.removeChild(e.target);
        }
    });

    modal.querySelector('.searchInput').addEventListener('input', populateLoadCargoModal);
    modal.querySelector('.categorySelect').addEventListener('change', populateLoadCargoModal);

    document.querySelector('#loadCargoModalBtn').addEventListener('click', async () => {
        baseInventory = await fetchBaseInventory();
        populateLoadCargoModal();
        bsModal.show();
    });

    modal.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!selectedItems.size) {
            alert('Please select at least one item before submiting.');
            return;
        }

    });
}

async function renderCargo() {
    cargo = await fetchCargo();
    populateCargo();
    cargoSection.querySelector('.searchInput').addEventListener('input', populateCargo);
    cargoSection.querySelector('.categorySelect').addEventListener('change', populateCargo);
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderCargo();
    renderLoadCargoModal();

});

document.querySelector('#logout-btn')
    .addEventListener('click', async (e) => {
        try {
            const response = await fetch('http://localhost:3000/authentication/logout', {
                method: 'POST'
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
