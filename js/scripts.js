// scripts.js

// Fetch categories data and display as cards
async function displayCategoryCards() {
    const response = await fetch('../json/categories.json');
    const categories = await response.json();
    const container = document.getElementById('category-cards');

    categories.forEach(category => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url('../images/${category.image}')`;

        const content = `
            <div class="card-content">
                <h2>${category.name}</h2>
            </div>
        `;

        card.innerHTML = content;
        container.appendChild(card);

        card.addEventListener('click', () => {
            window.location.href = `../templates/plants.html?category=${encodeURIComponent(category.name)}`;
        });
    });
}

// Call the function to display category cards
displayCategoryCards();
