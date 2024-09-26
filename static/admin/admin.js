// .............API REQUESTS..............
async function fetchInventory() {
  try {
    const response = await fetch('http://localhost:3000/admin/getInventory');

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeFromBaseInventory(itemId, rescuerId) {
  try {
    const response = await fetch(`http://localhost:3000/admin/removeFromBaseInventory?rescuerId=${rescuerId}&itemId=${itemId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}


async function fetchCatalogue() {
  try {
    const response = await fetch('http://localhost:3000/admin/getCatalogue');
    if (response.ok) {
      catalogueItems = await response.json();
      return catalogueItems;
      //return await response.json();
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addToBaseInventory(items) {
  try {
    const response = await fetch('http://localhost:3000/admin/addToBaseInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
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

async function registerRescuer(rescuer) {
  if (rescuer.type !== 'rescuer') {
    alert('Invalid user type.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/admin/registerRescuer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rescuer),
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

async function createAnnouncement(title, content, announcementItems) {
  try {
    const response = await fetch('/admin/createAnnouncement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, items: announcementItems }),
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
const baseInventoryCard = document.querySelector('#baseInventory');
const vehicleInventoryCard = document.querySelector('#vehicleInventory');
const baseSearchInput = baseInventoryCard.querySelector('input[type="text"]');
const baseCategorySelect = baseInventoryCard.querySelector('select');
const vehicleSearchInput = vehicleInventoryCard.querySelector('input[type="text"]');
const vehicleCategorySelect = vehicleInventoryCard.querySelector('select');
var baseInventory = [];
var vehicleInventory;
var catalogueItems = [];


function filterItems(item, searchText, selectedCategories) {
  const nameMatches = item.itemName.toLowerCase().includes(searchText.toLowerCase());
  const categoryMatches = selectedCategories.length === 0 || selectedCategories[0] === '' || selectedCategories.includes(item.categoryId.toString());
  return nameMatches && categoryMatches;
}


function populateBaseInventory() {
  const searchedText = baseSearchInput.value.toLowerCase();
  const selectedCategories = Array.from(baseCategorySelect.selectedOptions).map(option => option.value);
  const tableBody = document.querySelector('#baseInventoryBody');
  tableBody.innerHTML = '';


  baseInventory.forEach((item, index) => {
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

function populateVehicleInventory() {
  const searchedText = vehicleSearchInput.value;
  const selectedCategories = Array.from(vehicleCategorySelect.selectedOptions).map(option => option.value);
  const accordion = document.querySelector('#vehicleAccordion');
  accordion.innerHTML = '';

  const vehicles = Object.groupBy(vehicleInventory, ({ rescuer }) => rescuer);
  //console.log(vehicles);

  Object.values(vehicles).forEach((vehicle, index) => {

    filteredInventory = vehicle.filter(item => filterItems(item, searchedText, selectedCategories));

    if (filteredInventory.length > 0) {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${vehicle[0].rescuer}">
        <button class="accordion-button bg-body-secondary ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${vehicle[0].rescuer}">
          Rescuer #${vehicle[0].rescuer}: ${vehicle[0].rescuerName}
        </button>
      </h2>
      <div id="collapse${vehicle[0].rescuer}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
        <div class="accordion-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${filteredInventory.map((item, itemIndex) => `
                  <tr>
                    <td>${item.itemName}</td>
                    <td>${item.categoryName}</td>
                    <td>${item.quantity}</td>
                    <td>
                      <button class="btn btn-sm btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itemDetails${vehicle[0].rescuer}-${itemIndex}">
                          Details
                        </button>
                  </tr>
                  <tr>
                      <td colspan="4" class="p-0">
                        <div class="collapse" id="itemDetails${vehicle[0].rescuer}-${itemIndex}">
                          <div class="card card-body my-1">
                            ${item.details.map(detail => `
                              <div><strong>${detail.detail_name}:</strong> ${detail.detail_value}</div>
                            `).join('')}
                          </div>
                        </div>
                      </td>
                    </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
      accordion.appendChild(accordionItem);
    }
  });

}


function populateCatalogueTable(container) {
  const tableBody = container.querySelector('.catalogueTableBody');
  const searchText = container.querySelector('.catalogueSearch').value;
  const selectedCategories = Array.from(container.querySelector('.catalogueCategorySelect').selectedOptions).map(option => option.value);

  tableBody.innerHTML = '';

  catalogueItems.forEach((item, index) => {
    if (filterItems(item, searchText, selectedCategories)) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>
      <input type="checkbox" class="form-check-input" name="selectedItems" value="${item.itemId}">
      </td>
      <td>${item.itemName}</td>
      <td>${item.categoryName}</td>
      <td>
      <input type="number" class="form-control form-control-sm" name="quantity_${item.itemId}" min="1" value="1">
      </td>
      <td>
        <button type="button" class="btn btn-primary btn-sm show-details collapsed"
          data-bs-toggle="collapse" data-bs-target="#catalogueDetails${index}">
          Details
        </button>
      </td>
      `;

      // const detailsButton = tr.querySelector('.show-details');
      // detailsButton.addEventListener('click', (event) => {
      //   event.stopPropagation();
      // });

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

function populateCatalogueTableAnnc(container) {
  const tableBody = container.querySelector('.catalogueTableBody');
  const searchText = container.querySelector('.catalogueSearch').value;
  const selectedCategories = Array.from(container.querySelector('.catalogueCategorySelect').selectedOptions).map(option => option.value);

  tableBody.innerHTML = '';

  catalogueItems.forEach((item, index) => {
    if (filterItems(item, searchText, selectedCategories)) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>
        <button  class="btn addItemBtn btn-primary btn-sm" data-item-id="${item.itemId}">
          <i class="bi bi-plus"></i>
        </button>
      </td>
      <td id="nameCell">${item.itemName}</td>
      <td>${item.categoryName}</td>
      <td>
      <input type="number" class="form-control form-control-sm" name="quantity_${item.itemId}" min="1" value="1">
      </td>
      <td>
        <button class="btn btn-primary btn-sm show-details collapsed"
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

async function renderInventory() {
  // the retrieved inventory is sorted by rescuer
  const inventory = await fetchInventory();
  baseInventory = [];
  // a rescuer of id 1 represents the main wharehouse
  var item = inventory.shift();
  while (item.rescuer == 1) {
    baseInventory.push(item);
    item = inventory.shift();
  }

  // the rest are vehicles inventory
  vehicleInventory = inventory;
  populateBaseInventory();
  populateVehicleInventory();

}

function renderCatalogueModal() {
  const modal = document.querySelector('#addFromCatalogueModal')
  const btn = document.querySelector('#addFromCatalogueModalBtn');
  btn.addEventListener('click', async () => {
    await fetchCatalogue();
    populateCatalogueTable(modal);

    modal.querySelector('.catalogueSearch').addEventListener('input', () => populateCatalogueTable(modal));
    modal.querySelector('.catalogueCategorySelect').addEventListener('change', () => populateCatalogueTable(modal));
    modal.querySelector('#addFromCatalogueForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedItems = document.querySelectorAll('input[name="selectedItems"]:checked');
      const items = Array.from(selectedItems).map(checkbox => ({
        itemId: checkbox.value,
        quantity: document.querySelector(`input[name="quantity_${checkbox.value}"]`).value
      }));

      if (items.length === 0) {
        alert('Please select at least one item to add.');
        return;
      }

      await addToBaseInventory(items);
      await renderInventory();
      const bsModal = bootstrap.Modal.getInstance(document.querySelector('#addFromCatalogueModal'));
      bsModal.hide();

    });

  });
}

function renderAnnouncementModal() {
  const btn = document.querySelector('#createAnnouncementModalBtn');
  const modal = document.querySelector('#createAnnouncementModal');

  btn.addEventListener('click', async () => {
    await fetchCatalogue();
    populateCatalogueTableAnnc(modal);
    modal.querySelector('.catalogueSearch').addEventListener('input', () => populateCatalogueTableAnnc(modal));
    modal.querySelector('.catalogueCategorySelect').addEventListener('change', () => populateCatalogueTableAnnc(modal));

  });

  const announcementItems = new Map();
  const itemBadgeList = modal.querySelector('.itemBadgeList');

  modal.querySelector('.modal-body').addEventListener('click', async (e) => {
    if (e.target.closest('.addItemBtn')) {
      const itemId = e.target.closest('.addItemBtn').dataset.itemId;
      const itemName = e.target.closest('tr').querySelector('#nameCell').innerText;

      if (!announcementItems.has(itemId)) {
        const badge = document.createElement('button');
        badge.classList.add('badge', 'rounded-pill', 'text-bg-secondary');
        badge.setAttribute('data-item-id', itemId);
        badge.innerHTML = itemName;
        itemBadgeList.appendChild(badge);

        announcementItems.set(itemId, itemName);
      }
    }

    if (e.target.closest('.badge')) {
      const itemId = e.target.dataset.itemId;
      announcementItems.delete(itemId);
      itemBadgeList.removeChild(e.target);
    }
  });

  modal.querySelector('#saveAnnouncementBtn').addEventListener('click', async (e) => {
    const title = modal.querySelector('#announcementTitle').value;
    const content = modal.querySelector('#announcementContent').value;

    if (!title) {
      alert('Please enter a title for the announcement.');
      return;
    }

    await createAnnouncement(title, content, Array.from(announcementItems.keys()));
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderInventory();
  renderCatalogueModal();
  renderAnnouncementModal();

});

baseSearchInput.addEventListener('input', populateBaseInventory);
baseCategorySelect.addEventListener('change', populateBaseInventory);
vehicleSearchInput.addEventListener('input', populateVehicleInventory);
vehicleCategorySelect.addEventListener('change', populateVehicleInventory);
//document.querySelector('#catalogueSearch').addEventListener('input', populateCatalogueTable);
//document.querySelector('#catalogueCategorySelect').addEventListener('change', populateCatalogueTable);


document.querySelector('#registerRescuerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const rescuer = {
    "email": form.querySelector('#email').value,
    "username": form.querySelector("#username").value,
    "password": form.querySelector('#password').value,
    "type": "rescuer",
    "phone": form.querySelector('#phone').value,
    "name": form.querySelector("#name").value,
    "surname": form.querySelector("#surname").value,
  }

  await registerRescuer(rescuer);
  const modal = bootstrap.Modal.getInstance(document.querySelector('#registerRescuerModal'));
  modal.hide();
});

// Logout button handler
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




