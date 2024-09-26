const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const map = L.map('map', {
    center: [37.9838, 23.7275],
    zoom: 13,
    layers: [osm]
});



const icons = {
    base: L.icon({
        iconUrl: '/images/warehouse.png',
        iconSize: [36, 36],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    vehicle: L.icon({
        iconUrl: '/images/truck.png',
        iconSize: [36, 36],
        iconAnchor: [16, 24],
        popupAnchor: [0, -32]
    }),
    request: L.icon({
        iconUrl: '/images/request.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    offer: L.icon({
        iconUrl: '/images/offer.png',
        iconSize: [36, 36],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    completedOffer: L.icon({
        iconUrl: '/images/picked_up.png',
        iconSize: [36, 36],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    completedRequest: L.icon({
        iconUrl: '/images/received.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    acceptedRequest: L.icon({
        iconUrl: '/images/accepted_request.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    acceptedOffer: L.icon({
        iconUrl: '/images/accepted_offer.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),

};


const colors = {
    base: 'purple',
    vehicle: 'blue',
    acceptedRequest: 'blue',
    acceptedOffer: 'green',
    pendingRequest: 'orange',
    pendingOffer: 'orange',
    cancelledRequest: 'grey',
    cancelledOffer: 'grey',
    completedRequest: 'green',
    completedOffer: 'green'
};


const layers = {
    vehicles: L.layerGroup(),
    pendingRequests: L.layerGroup(),
    acceptedRequests: L.layerGroup(),
    completedRequests: L.layerGroup(),
    cancelledRequests: L.layerGroup(),
    pendingOffers: L.layerGroup(),
    acceptedOffers: L.layerGroup(),
    completedOffers: L.layerGroup(),
    cancelledOffers: L.layerGroup(),
    lines: L.layerGroup()
};


layers.vehicles.addTo(map);
layers.lines.addTo(map);
layers.pendingRequests.addTo(map);
layers.pendingOffers.addTo(map);
layers.acceptedRequests.addTo(map);
layers.acceptedOffers.addTo(map);


let baseMarker = L.marker([37.9838, 23.7275], { icon: icons.base, draggable: true })
    .addTo(map)
    .bindPopup("Base Location");

baseMarker.on('dragend', function (event) {
    const newPosition = event.target.getLatLng();
    if (confirm('Are you sure you want to change the base location?')) {
        baseMarker.setLatLng(newPosition);
        updateBaseLocation(newPosition.lat, newPosition.lng);
    } else {
        event.target.setLatLng(baseMarker.getLatLng());
    }
});


function populateVehicles(vehicles) {
    vehicles.forEach(vehicle => {
        const marker = L.marker([vehicle.lat, vehicle.lng], {
            icon: icons.vehicle
        })
            .bindPopup(`
            <b>Vehicle #${vehicle.id}: ${vehicle.username}</b><br>
            ${vehicle.activeTasks ? `Active Tasks: ${vehicle.activeTasks.length}` : ''}
        `);

        layers.vehicles.addLayer(marker);

        if (vehicle.activeTasks) {
            vehicle.activeTasks.forEach(task => {
                const line = L.polyline([
                    [vehicle.lat, vehicle.lng],
                    [task.lat, task.lng]
                ], {
                    color: task.type === 'request' ? 'blue' : 'green'
                });
                line.addTo(layers.lines);
            });
        }
    });
}


function populateRequests(requests) {
    requests.forEach(request => {
        var layer;
        var color;
        var icon;

        if (request.status === 'pending') {
            layer = layers.pendingRequests;
            color = colors.pendingRequest;
            icon = icons.request;
        } else if (request.status === 'accepted') {
            layer = layers.acceptedRequests;
            color = colors.acceptedRequest;
            icon = icons.acceptedRequest;
        } else if (request.status === 'cancelled') {
            layer = layers.cancelledRequests;
            color = colors.cancelledRequest;
            icon = icons.request;
        } else if (request.status === 'completed') {
            layer = layers.completedRequests;
            color = colors.completedRequest;
            icon = icons.completedRequest;
        }

        const marker = L.marker([request.location.lat, request.location.lng], {
            icon: icon
        })
            .bindPopup(`
                <div style="max-width: 200px;">
                    <b>Request #${request.requestId}</b><br>
                    Name: ${request.name}<br>
                    Phone: ${request.phone}<br>
                    Date: ${new Date(request.date).toLocaleString()}<br>
                    Status: <span style="color: ${color};">${request.status}</span><br>
                    People in need: ${request.peopleInNeed}<br>
                    Items:
                    <div style="max-height: 100px; overflow-y: auto; border: 1px solid #ccc; padding: 5px; margin-top: 5px;">
                        <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                            ${request.items.map(item => `<li>${item.itemName}</li>`).join('')}
                        </ul>
                    </div>
                    ${request.rescuerName ? `<br>Assigned to: ${request.rescuerName}<br>Rescuer Phone: ${request.rescuerPhone}` : ''}
                </div>
            `);

        layer.addLayer(marker);

        if (request.rescuerId) {
            const vehicleMarker = findVehicleMarker(request.rescuerName);
            if (vehicleMarker) {
                layer.addLayer(L.polyline([marker.getLatLng(), vehicleMarker.getLatLng()], { color: 'blue' }));
            }
        }
    });
}


function populateOffers(offers) {
    offers.forEach(offer => {
        var layer;
        var color;
        var icon;

        if (offer.status === 'pending') {
            layer = layers.pendingOffers;
            color = colors.pendingOffer;
            icon = icons.offer;
        } else if (offer.status === 'accepted') {
            layer = layers.acceptedOffers;
            color = colors.acceptedOffer;
            icon = icons.acceptedOffer;
        } else if (offer.status === 'cancelled') {
            layer = layers.cancelledOffers;
            color = colors.cancelledOffer;
            icon = icons.offer;
        } else if (offer.status === 'completed') {
            layer = layers.completedOffers;
            color = colors.completedOffer;
            icon = icons.completedOffer;
        }

        const marker = L.marker([offer.location.lat, offer.location.lng], {
            icon: icon
        })
            .bindPopup(`
                <div style="max-width: 200px;">
                    <b>Offer #${offer.offerId}</b><br>
                    Name: ${offer.name}<br>
                    Phone: ${offer.phone}<br>
                    Date: ${new Date(offer.date).toLocaleString()}<br>
                    Status: <span style="color: ${color};">${offer.status}</span><br>
                    Items:
                    <div style="max-height: 100px; overflow-y: auto; border: 1px solid #ccc; padding: 5px; margin-top: 5px;">
                        <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                            ${offer.items.map(item => `<li>${item.itemName} (${item.quantity})</li>`).join('')}
                        </ul>
                    </div>
                    ${offer.rescuerName ? `<br>Assigned to: ${offer.rescuerName}<br>Rescuer Phone: ${offer.rescuerPhone}` : ''}
                </div>
            `);

        layer.addLayer(marker);

        if (offer.rescuerId) {
            const vehicleMarker = findVehicleMarker(offer.rescuerName);
            if (vehicleMarker) {
                layer.addLayer(L.polyline([marker.getLatLng(), vehicleMarker.getLatLng()], { color: 'green' }));
            }
        }
    });
}

function findVehicleMarker(username) {
    let foundMarker = null;
    layers.vehicles.eachLayer(function (layer) {
        if (layer.getPopup().getContent().includes(username)) {
            foundMarker = layer;
        }
    });
    return foundMarker;
}


const overlays = {
    "Vehicles": layers.vehicles,
    "Pending Requests": layers.pendingRequests,
    "Accepted Requests": layers.acceptedRequests,
    "Completed Requests": layers.completedRequests,
    "Cancelled Requests": layers.cancelledRequests,
    "Pending Offers": layers.pendingOffers,
    "Accepted Offers": layers.acceptedOffers,
    "Completed Offers": layers.completedOffers,
    "Cancelled Offers": layers.cancelledOffers,
    "Lines": layers.lines
};

L.control.layers(null, overlays, { collapsed: false }).addTo(map);

async function fetchMapData() {
    try {
        const response = await fetch('http://localhost:3000/admin/getMapData');

        if (response.ok) {
            const { vehicles, requests, offers } = await response.json();
            console.log(vehicles);
            console.log(requests);
            console.log(offers);
            populateVehicles(vehicles);
            populateRequests(requests);
            populateOffers(offers);
        } else {
            console.error('Error fetching map data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching map data:', error);
    }
}

async function updateBaseLocation(lat, lng) {
    try {
        const response = await fetch('http://localhost:3000/admin/updateBaseLocation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat, lng })
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error updating base location:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating base location:', error);
    }
}


fetchMapData();