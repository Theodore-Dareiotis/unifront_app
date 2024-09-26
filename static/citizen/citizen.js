// .............API REQUESTS..............
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

async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/citizen/getRequests');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchAnnouncements() {
    try {
        const response = await fetch('http://localhost:3000/citizen/getAnnouncements');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function createOffer(items) {
    try {
        const response = await fetch('/citizen/createOffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
        });

        if (response.ok) {
            return await response.json();
        }
        else {
            throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function createRequest(items, peopleInNeed) {
    try {
        const response = await fetch('/citizen/createRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items, peopleInNeed }),
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

async function fetchInventory() {
    try {
        const response = await fetch('http://localhost:3000/citizen/getBaseInventory');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function fetchOffers() {
    try {
        const response = await fetch('http://localhost:3000/citizen/getOffers');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function cancelOffer(offerId) {
    try {
        const response = await fetch(`/citizen/cancelOffer/${offerId}`, {
            method: 'PUT',
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function cancelRequest(requestId) {
    try {
        const response = await fetch(`/citizen/cancelRequest/${requestId}`, {
            method: 'PUT',
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error);
    }
}


// ............DOM RELATED..................
var announcements;
var offers;
var requests;
var inventory;


function populateRequests(requests) {
    const container = document.querySelector('#requestsContainer');
    container.innerHTML = '';

    requests.forEach((request, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Request #${index}</h5>
                <small>${new Date(request.date).toLocaleString()}</small>
            </div>
            <div class="card-body">
                
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6>Requested Items</h6>
                        <h6>People in need: ${request.peopleInNeed}</h6>
                    </div>
                   <ul class="list-group">
                    ${request.items.map(item => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${item.itemName}
                        </li>
                    `).join('')}
                </ul>
                </div>
                <div class="d-flex justify-content-between flex-wrap gap-1 align-items-center">
                    ${status(request.status)}
                </div>
            </div>
        `;
        function status(status) {
            if (status === 'pending') {
                return `<span class="badge bg-warning">${status} from ${new Date(request.date).toLocaleString()}</span>
                <button class="btn btn-danger cancelRequestBtn" data-request-id="${request.requestId}">Cancel Request</button>`;
            } else if (status === 'accepted') {
                return `<span class="badge bg-info">${status} at ${new Date(request.updateDate).toLocaleString()}</span>`;
            } else if (status === 'completed') {
                return `<span class="badge bg-success">${status} at ${new Date(request.updateDate).toLocaleString()}</span>`;
            } else if (status === 'cancelled') {
                return `<span class="badge bg-danger">${status} at ${new Date(request.updateDate).toLocaleString()}</span>`;
            }
        }
        container.appendChild(card);
    });

}

function populateAnnouncements(announcements) {
    const container = document.querySelector('#announcementsContainer');
    container.innerHTML = '';

    announcements.forEach((announcement) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">${announcement.title}</h5>
            <small>${new Date(announcement.date).toLocaleString()}</small>
        </div>
        <div class="card-body">
            <p class="card-text">${announcement.content}</p>
            <div class="mb-3">
                <h6>Associated Items</h6>
                <div class="itemBadgeList d-flex flex-wrap gap-1 p-2 m-2">
                    ${announcement.items.map(item => `
                        <span class="badge rounded-pill text-bg-secondary">${item.itemName}</span>
                    `).join('')}
                </div>
            </div>
            <button class="btn btn-primary showOfferModal" data-announcement-id="${announcement.announcementId}">Make an offer</button>
        </div>
        `;
        container.appendChild(card);
    });
}

function populateOfferModal(announcement) {
    const modal = document.querySelector('#makeOfferModal');
    modal.setAttribute('data-announcement-id', announcement.announcementId);

    const tableBody = modal.querySelector('.tableBody');
    // const searchText = modal.querySelector('.itemsSearch').value.toLowerCase();
    // const selectedCategories = Array.from(modal.querySelector('.itemsSelect').selectedOptions).map(option => option.value);

    tableBody.innerHTML = '';
    //console.log(announcement);
    announcement.items.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <input type="checkbox" class="form-check-input" name="selectedItems" value="${item.itemID}">
            </td>
            <td>${item.itemName}</td>
            <td>
                <input type="number" class="form-control form-control-sm" name="quantity_${item.itemID}" min="1" value="1">
            </td>
            `;
        tableBody.appendChild(tr);
    });
}

function populateMakeRequestModal() {
    const modal = document.querySelector('#makeRequestModal');
    const tableBody = modal.querySelector('.tableBody');

    const searchText = modal.querySelector('.itemsSearch').value.toLowerCase();
    const selectedCategories = Array.from(modal.querySelector('.itemsSelect').selectedOptions).map(option => option.value);

    tableBody.innerHTML = '';

    inventory.forEach((item, index) => {
        if (filterItems(item, searchText, selectedCategories)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.categoryName}</td>
            <td>
                <button type="button" class="btn btn-primary btn-sm show-details collapsed"
                    data-bs-toggle="collapse" data-bs-target="#catalogueDetails${index}">
                    Details
                </button>
            </td>
            <td>
                <button type="button" class="btn addItemBtn btn-primary btn-sm" data-item-id="${item.itemId}">
                    <i class="bi bi-plus"></i>
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

function populateOffers(offers) {
    const container = document.querySelector('#offersContainer');
    container.innerHTML = '';
    console.log(offers);
    offers.forEach((offer, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Offer #${index}</h5>
            <small>${new Date(offer.date).toLocaleString()}</small>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <h6>Offered Items</h6>
                <ul class="list-group">
                    ${offer.items.map(item => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${item.itemName}
                            <span class="badge bg-primary rounded-pill">Quantity: ${item.quantity}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="d-flex justify-content-between flex-wrap gap-1 align-items-center">
                ${status(offer.status)}
            </div>
        </div>
        `;
        function status(status) {
            if (status === 'accepted') {
                return `<span class="badge bg-info">${status} at ${new Date(offer.updateDate).toLocaleString()}</span>`;
            } else if (status === 'completed') {
                return `<span class="badge bg-success">${status} at ${new Date(offer.updateDate).toLocaleString()}</span>`;
            } else if (status === 'cancelled') {
                return `<span class="badge bg-danger">${status} at ${new Date(offer.updateDate).toLocaleString()}</span>`;
            } else {
                return `
                <span class="badge bg-warning">${status} from ${new Date(offer.date).toLocaleString()}</span>
                <button class="btn btn-danger cancelOfferBtn" data-offer-id="${offer.offerId}">Cancel Offer</button>
                `;
            }
        }

        container.appendChild(card);
    });
}

async function renderAnnouncements() {
    announcements = await fetchAnnouncements();
    populateAnnouncements(announcements);
}

function renderMakeRequestModal() {
    const modal = document.querySelector('#makeRequestModal');
    const bsModal = new bootstrap.Modal(modal);


    modal.querySelector('.itemsSearch').addEventListener('input', () => {
        populateMakeRequestModal();
    });

    modal.querySelector('.itemsSelect').addEventListener('change', () => {
        populateMakeRequestModal();
    });

    const requestItems = new Map();
    const itemBadgeList = modal.querySelector('.itemBadgeList');
    modal.querySelector('.modal-body').addEventListener('click', (e) => {
        if (e.target.closest('.addItemBtn')) {
            const itemId = e.target.closest('.addItemBtn').dataset.itemId;
            const itemName = e.target.closest('tr').querySelector('td').innerText;

            if (!requestItems.has(itemId)) {
                const badge = document.createElement('button');
                badge.classList.add('badge', 'rounded-pill', 'text-bg-secondary');
                badge.setAttribute('data-item-id', itemId);
                badge.innerHTML = itemName;
                itemBadgeList.appendChild(badge);

                requestItems.set(itemId, itemName);
            }
        }

        if (e.target.closest('.badge')) {
            const itemId = e.target.dataset.itemId;
            requestItems.delete(itemId);
            itemBadgeList.removeChild(e.target);
        }
    });

    document.querySelector('#makeRequestBtn').addEventListener('click', async () => {
        inventory = await fetchInventory();
        populateMakeRequestModal();
        bsModal.show();
    });

    modal.querySelector('#makeRequestForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const peopleInNeed = document.querySelector('.peopleInNeed').value;
        if (!peopleInNeed || requestItems.size === 0) {
            alert('Please enter the number of people in need and select at least one item.');
            return;
        }
        await createRequest(Array.from(requestItems.keys()), peopleInNeed);
        requests = await fetchRequests();
        populateRequests(requests);
        bsModal.hide();
    });
}


function renderMakeOfferModal() {
    const modal = document.querySelector('#makeOfferModal');
    const bsModal = new bootstrap.Modal(modal);

    document.querySelector('#announcementsContainer').addEventListener('click', (e) => {
        if (e.target.closest('.showOfferModal')) {
            const announcementId = e.target.closest('.showOfferModal').dataset.announcementId;
            populateOfferModal(announcements.find(announcement => announcement.announcementId == announcementId));
            bsModal.show();
        }
    });

    modal.querySelector('#makeOfferForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectedItems = document.querySelectorAll('input[name="selectedItems"]:checked');
        const items = Array.from(selectedItems).map(checkbox => ({
            itemId: checkbox.value,
            quantity: document.querySelector(`input[name="quantity_${checkbox.value}"]`).value
        }));

        await createOffer(items);
        offers = await fetchOffers();
        populateOffers(offers);
        bsModal.hide();
    });
}



async function renderOffers() {
    offers = await fetchOffers();
    if (offers) {
        populateOffers(offers);
    }

    document.querySelector('#offersContainer').addEventListener('click', async (e) => {
        if (e.target.closest('.cancelOfferBtn')) {
            if (confirm('Are you sure you want to cancel this offer?')) {
                const offerId = e.target.closest('.cancelOfferBtn').dataset.offerId;
                await cancelOffer(offerId);
                offers = await fetchOffers();
                populateOffers(offers);
            }
        }
    });
}

async function renderRequests() {
    requests = await fetchRequests();
    if (requests) {
        populateRequests(requests);
    }

    document.querySelector('#requestsContainer').addEventListener('click', async (e) => {
        if (e.target.closest('.cancelRequestBtn')) {
            if (confirm('Are you sure you want to cancel this request?')) {
                const requestId = e.target.closest('.cancelRequestBtn').dataset.requestId;
                await cancelRequest(requestId);
                requests = await fetchRequests();
                populateRequests(requests);
            }
        }
    });
}



function filterItems(item, searchText, selectedCategories) {
    const matchesSearch = item.itemName.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories[0] === '' || selectedCategories.includes(item.categoryId.toString());
    return matchesSearch && matchesCategory;
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderAnnouncements();
    renderMakeOfferModal();
    await renderOffers();
    await renderRequests();
    renderMakeRequestModal();
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