document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    const categorySelect = document.querySelector('#categoryFilter');
    const tableBody = document.querySelector('#tableBody');


    const allItems = tableBody.innerHTML;

    // Filters table according to the predicate, by using css to hide row elements.
    function filterItems(predicate) {

        tableBody.innerHTML = allItems;
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach((row) => {
            const itemName = row.childNodes[1].textContent.toLowerCase();
            const itemCategory = row.childNodes[2].textContent;
            const categoryId = row.childNodes[2].getAttribute('data-category-id');

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

        const nameMatches = itemName.includes(searchedText);
        const categoryMatches = selectedCategory === categoryId || selectedCategory === '';

        if (nameMatches && categoryMatches) return true;
        return false;
    }

    searchInput.addEventListener('input', filterItems(ByNameAndCategory));
    categorySelect.addEventListener('change', filterItems(ByNameAndCategory));
});




