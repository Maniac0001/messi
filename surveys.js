document.querySelectorAll('.poll-option').forEach(option => {
    option.addEventListener('click', function () {
        // Check if the user has already voted
        if (localStorage.getItem('hasVoted')) {
            showPopup('You have already voted!');
            return;
        }

        // Mark as voted in local storage
        localStorage.setItem('hasVoted', true);

        // Increase the vote count
        const voteCount = parseInt(this.dataset.votes) || 0;
        this.dataset.votes = voteCount + 1;

        // Calculate percentages
        const totalVotes = Array.from(document.querySelectorAll('.poll-option'))
            .reduce((sum, option) => sum + parseInt(option.dataset.votes || 0), 0);

        document.querySelectorAll('.poll-option').forEach(option => {
            const percentage = ((parseInt(option.dataset.votes) || 0) / totalVotes) * 100;
            option.querySelector('.percentage').textContent = `${percentage.toFixed(1)}%`;
        });

        showPopup('Thank you for voting!');
    });
});

// Function to display a popup message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000); // Remove popup after 3 seconds
}
