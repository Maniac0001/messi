// Get the necessary elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const playersContainer = document.getElementById('players-container');

// Function to filter player cards based on the search query
function filterPlayers() {
    const query = searchInput.value.toLowerCase();
    const playerCards = document.querySelectorAll('.player-card');
    
    // Loop through all player cards
    playerCards.forEach(card => {
        const playerName = card.querySelector('h3').innerText.toLowerCase();
        
        // Show card if name includes the query, otherwise hide it
        if (playerName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listener for the search button
searchBtn.addEventListener('click', filterPlayers);

// Event listener to trigger the search when the Enter key is pressed
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterPlayers();
    }
});

// Real-time filtering as the user types
searchInput.addEventListener('input', filterPlayers);
