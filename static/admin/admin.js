// Logout button handler
document.querySelector('#logout-btn')
    .addEventListener('click', async (e) => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                console.log('logout succeeded');
                window.location.href = '/';
            } else {
                console.log('logout failed');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    });

// Dynamically adding item details fields

const addDetailBtn = document.querySelector('#addDetailBtn');
const detailsContainer = document.querySelector('#detailsContainer');
let detailCount = 0;


addDetailBtn.addEventListener('click', () => {
    detailCount++;
    const detailFields = document.createElement('div');
    detailFields.classList.add('mb-3', 'detail-group');
    detailFields.innerHTML = `
    <div class="input-group">
        <input type="text" class="form-control" name="detail_name_${detailCount}" placeholder="Detail Name" required>
        <input type="text" class="form-control" name="detail_value_${detailCount}" placeholder="Detail Value" required>
        <button type="button" class="btn btn-danger remove-detail">
            <i class="bi bi-trash"></i>
        </button>
    </div>
    `;

    detailsContainer.appendChild(detailFields);
    detailFields.querySelector('.remove-detail').addEventListener('click', () => {
        detailsContainer.removeChild(detailFields);
    });
});



