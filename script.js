
const accessKey = 'EccCli-le9O4ky0qv-X5ox502M8aoMMDTk0Bf_e3LTk'; 

const formEl = document.getElementById('search-form');
const inputEl = document.getElementById('search-box');
const searchResultsEl = document.getElementById('search-results');
const showMoreButton = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages() {
    try {
        inputData = inputEl.value;
        const url = https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(inputData)}&client_id=${accessKey}&per_page=9;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch images');

        const data = await response.json();
        const results = data.results;

        // Clear previous results on new search
        if (page === 1) {
            searchResultsEl.innerHTML = '';
        }

        if (results.length === 0) {
            searchResultsEl.innerHTML = '<p>No images found. Try another search.</p>';
            showMoreButton.style.display = 'none';
            return;
        }

        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description || 'Image';
            image.className = 'search-image';
            searchResultsEl.appendChild(image);
        });

        page++;
        showMoreButton.style.display = 'block';
    } catch (error) {
        console.error(error);
        searchResultsEl.innerHTML = '<p>Error loading images. Please try again later.</p>';
        showMoreButton.style.display = 'none';
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1; 
    searchImages();
});

showMoreButton.addEventListener('click', () => {
    searchImages();
});