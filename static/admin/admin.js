// fetching data
async function fetchInventory() {
  try {
    const response = await fetch('http://localhost:3000/admin/getInventory');

    if (response.ok) {
      const inventory = await response.json();
      return inventory;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}


const baseInventoryCard = document.querySelector('#baseInventory');
const vehicleInventoryCard = document.querySelector('#vehicleInventory');
const baseSearchInput = baseInventoryCard.querySelector('input[type="text"]');
const baseCategorySelect = baseInventoryCard.querySelector('select');
const vehicleSearchInput = vehicleInventoryCard.querySelector('input[type="text"]');
const vehicleCategorySelect = vehicleInventoryCard.querySelector('select');
var baseInventory = [];
var vehicleInventory;


function filterItems(item, searchText, categoryId) {
  const nameMatches = item.itemName.toLowerCase().includes(searchText.toLowerCase());
  const categoryMatches = categoryId === '' || item.categoryId.toString() === categoryId;
  return nameMatches && categoryMatches;
}


// Populate base inventory
function populateBaseInventory() {
  const searchedText = baseSearchInput.value.toLowerCase();
  const selectedCategory = baseCategorySelect.value;
  console.log(searchedText);
  console.log(selectedCategory);
  const tbody = document.querySelector('#baseInventoryBody');
  tbody.innerHTML = '';

  // const filteredInventory = baseInventory.filter(item =>
  //   filterItems(item, searchedText, selectedCategory)
  // );

  // filteredInventory.forEach(item => {
  //   const tr = document.createElement('tr');
  //   tr.innerHTML = `
  //     <td>${item.itemName}</td>
  //     <td>${item.categoryName}</td>
  //     <td>${item.quantity}</td>
  //     <td><button class="btn btn-danger btn-sm">Remove</button></td>`;
  //   tbody.appendChild(tr);

  baseInventory.forEach(item => {

    const nameMatches = item.itemName.toLowerCase().includes(searchedText);
    const categoryMatches = item.categoryId == selectedCategory || selectedCategory === '';

    if (nameMatches && categoryMatches) {
      const tr = document.createElement('tr');
      //tr.setAttribute('data-category-id', item.categoryId);
      tr.innerHTML = `
        <td>${item.itemName}</td>
        <td>${item.categoryName}</td>
        <td>${item.quantity}</td>
        <td><button class="btn btn-danger btn-sm">Remove</button></td>`;
      tbody.appendChild(tr);
    }
  });

}

//Populate vehicle inventories
function populateVehicleInventory() {
  const searchedText = vehicleSearchInput.value;
  const selectedCategory = vehicleCategorySelect.value;
  const accordion = document.querySelector('#vehicleAccordion');
  accordion.innerHTML = '';


  //const filteredInventory = vehicleInventory.filter(item => filterItems(item, searchedText, selectedCategory));

  const vehicles = Object.groupBy(vehicleInventory, ({ rescuer }) => rescuer);


  Object.values(vehicles).forEach((vehicle, index) => {

    filteredInventory = vehicle.filter(item => filterItems(item, searchedText, selectedCategory));

    if (filteredInventory.length > 0) {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${vehicle.id}">
        <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${vehicle.id}">
          ${vehicle.name}
        </button>
      </h2>
      <div id="collapse${vehicle.id}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
        <div class="accordion-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${vehicle.inventory.map(item => `
                  <tr>
                    <td>${item.category}</td>
                    <td>${item.item}</td>
                    <td>${item.quantity}</td>
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


async function renderInventory() {
  // the retrieved inventory is sorted by rescuer
  const inventory = await fetchInventory();

  // a rescuer of id 1 represents the main wharehouse
  var item = inventory.shift();
  while (item.rescuer == 1) {
    baseInventory.push(item);
    item = inventory.shift();
  }

  // the rest are vehicles inventory
  vehicleInventory = inventory;
  populateBaseInventory(baseInventory);
  populateVehicleInventory(vehicleInventory);

}

document.addEventListener('DOMContentLoaded', renderInventory);

baseSearchInput.addEventListener('input', populateBaseInventory);
baseCategorySelect.addEventListener('change', populateBaseInventory);
vehicleSearchInput.addEventListener('input', populateVehicleInventory);
vehicleCategorySelect.addEventListener('change', populateVehicleInventory);




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


