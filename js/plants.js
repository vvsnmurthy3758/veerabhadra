// js/plants.js

// Function to fetch plant data from JSON file
async function fetchPlantData() {
    try {
        const response = await fetch('../json/plants.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching plant data:', error);
    }
}

// Function to display plant cards in the main section
async function displayPlantCards(filteredData = null) {
    const plantData = await fetchPlantData();
    const main = document.querySelector('main');

    // Clear existing content
    main.innerHTML = '';

    // Use filtered data if available, otherwise use the full data set
    const dataToDisplay = filteredData || plantData;

    // Iterate through plant data and create card views
    dataToDisplay.forEach(plant => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Construct card content (main image, common name, scientific name)
        const content = `
            <img src="../images/${plant.mainImage}" alt="${plant.commonNames[0]}">
            <h2>${plant.commonNames[0]}</h2>
            <p>${plant.scientificName}</p>
        `;

        card.innerHTML = content;
        main.appendChild(card);

        // Add click event listener to open modal window with plant data
        card.addEventListener('click', () => {
            displayPlantDataInModal(plant);
            document.getElementById('myModal').style.display = 'block';
        });
    });
}

// Function to display plant data in the modal
function displayPlantDataInModal(plant) {
    const modalImg = document.getElementById('modalImg');
    modalImg.src = `../images/${plant.mainImage}`;

    const modalData = document.getElementById('modalData');
    modalData.innerHTML = `
        <h2>${plant.commonNames[0]}</h2>
        <p>Scientific Name: ${plant.scientificName}</p>
        <p>Category: ${plant.category}</p>
        <p>Growth and Maintenance:</p>
        <ul>
            <li>Water Needs: ${plant.growthAndMaintenance.waterNeeds}</li>
            <li>Light Range: ${plant.growthAndMaintenance.lightRange}</li>
            <li>Height: ${plant.growthAndMaintenance.height}</li>
            <li>Spread: ${plant.growthAndMaintenance.spread}</li>
            <li>Season: ${plant.growthAndMaintenance.season}</li>
        </ul>
    `;
}

// Function to filter plant data based on search input or category
async function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const plantData = await fetchPlantData();
    const filteredData = plantData.filter(plant => {
        return (
            plant.commonNames.some(name => name.toLowerCase().includes(searchInput)) ||
            plant.scientificName.toLowerCase().includes(searchInput) ||
            plant.category.toLowerCase().includes(searchInput)
        );
    });

    // Display filtered plant cards
    displayFilteredPlantCards(filteredData);
}

// Function to display filtered plant cards in the main section
function displayFilteredPlantCards(filteredData) {
    const main = document.querySelector('main');

    // Clear existing content
    main.innerHTML = '';

    // Iterate through filtered plant data and create card views
    filteredData.forEach(plant => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Construct card content (main image, common name, scientific name)
        const content = `
            <img src="../images/${plant.mainImage}" alt="${plant.commonNames[0]}">
            <h2>${plant.commonNames[0]}</h2>
            <p>${plant.scientificName}</p>
        `;

        card.innerHTML = content;
        main.appendChild(card);

        // Add click event listener to open modal window with plant data
        card.addEventListener('click', () => {
            displayPlantDataInModal(plant);
            document.getElementById('myModal').style.display = 'block';
        });
    });
}

// Get the category from URL parameters
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

// Initial function call to display plant cards on page load
document.addEventListener('DOMContentLoaded', async () => {
    const category = getCategoryFromURL();
    const searchInput = document.getElementById('searchInput');

    if (category) {
        searchInput.value = category; // Set the search input to the category name
        const plantData = await fetchPlantData();
        const filteredData = plantData.filter(plant => plant.category.toLowerCase() === category.toLowerCase());
        displayPlantCards(filteredData);
    } else {
        displayPlantCards();
    }

    // Add event listener to search input for real-time search
    searchInput.addEventListener('input', search);
});

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// Event listener to close the modal when the close button or outside the modal is clicked
span.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
