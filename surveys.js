// Poll vote functionality
const voteButtons = document.querySelectorAll('.vote-btn');
voteButtons.forEach(button => {
    button.addEventListener('click', function () {
        const pollId = this.getAttribute('data-poll');
        const selectedOption = document.querySelector(`input[name="${pollId}"]:checked`);

        if (selectedOption) {
            // Check if the user has already voted
            if (sessionStorage.getItem(pollId)) {
                alert('You have already voted!');
                return;
            }

            // Store vote in sessionStorage
            sessionStorage.setItem(pollId, selectedOption.value);

            // Update the poll result
            updatePollResult(pollId, selectedOption.value);
        } else {
            alert('Please select an option!');
        }
    });
});

function updatePollResult(pollId, selectedOption) {
    const resultElement = document.getElementById(`${pollId}-result`);
    
    // Simulate a result update (percentage)
    const options = document.querySelectorAll(`input[name="${pollId}"]`);
    const votes = {
        'Messi': 45,
        'Ronaldo': 35,
        'Pele': 15,
        'Maradona': 5
    };

    // Calculate percentages
    const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);
    const percentage = (votes[selectedOption] / totalVotes) * 100;

    resultElement.innerHTML = `<p>${selectedOption} received ${Math.round(percentage)}% of the votes</p>`;

    // Show a progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('poll-progress-bar');
    progressBar.innerHTML = `<div class="progress" style="width: ${Math.round(percentage)}%"></div>`;
    resultElement.appendChild(progressBar);
}
















document.addEventListener("DOMContentLoaded", function () {
    const showOpinionFormBtn = document.getElementById('showOpinionFormBtn');
    const opinionPopup = document.getElementById('opinionPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const submitOpinionBtn = document.getElementById('submitOpinion');
    const opinionsList = document.getElementById('opinionsList');
    const nameInput = document.getElementById('name');
    const opinionText = document.getElementById('opinionText');

    // Owner flag
    const isOwner = true; // Set to true for the owner

    // Function to load opinions from localStorage
    function loadOpinions() {
        const opinions = JSON.parse(localStorage.getItem('opinions')) || [];
        opinions.forEach(({ name, opinion }) => {
            addOpinionToDOM(name, opinion);
        });
    }

    // Function to save opinions to localStorage
    function saveOpinion(name, opinion) {
        const opinions = JSON.parse(localStorage.getItem('opinions')) || [];
        opinions.push({ name, opinion });
        localStorage.setItem('opinions', JSON.stringify(opinions));
    }

    // Function to remove an opinion from localStorage
    function removeOpinionFromStorage(name, opinion) {
        const opinions = JSON.parse(localStorage.getItem('opinions')) || [];
        const updatedOpinions = opinions.filter(op => op.name !== name || op.opinion !== opinion);
        localStorage.setItem('opinions', JSON.stringify(updatedOpinions));
    }

    // Function to add an opinion to the DOM
    function addOpinionToDOM(name, opinion) {
        const opinionItem = document.createElement('div');
        opinionItem.classList.add('opinion-item');
        opinionItem.innerHTML = `
            <strong>${name}</strong>
            <p>${opinion}</p>
            <button class="delete-btn" style="display: ${isOwner ? 'inline-block' : 'none'};">Delete</button>
        `;

        // Delete button functionality
        const deleteBtn = opinionItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            if (isOwner) {
                removeOpinionFromStorage(name, opinion);
                opinionItem.remove();
            } else {
                alert("You are not authorized to delete this opinion.");
            }
        });

        opinionsList.appendChild(opinionItem);
    }

    // Show the opinion pop-up
    showOpinionFormBtn.addEventListener('click', function () {
        opinionPopup.style.display = 'flex';
    });

    // Close the pop-up
    closePopupBtn.addEventListener('click', function () {
        opinionPopup.style.display = 'none';
    });

    // Submit the opinion
    submitOpinionBtn.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const opinion = opinionText.value.trim();

        if (name && opinion) {
            addOpinionToDOM(name, opinion);
            saveOpinion(name, opinion);

            // Clear the form fields
            nameInput.value = '';
            opinionText.value = '';

            // Close the opinion popup
            opinionPopup.style.display = 'none';
        } else {
            alert('Please fill in both fields!');
        }
    });

    // Load opinions on page load
    loadOpinions();
});
