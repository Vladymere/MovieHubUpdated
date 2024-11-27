// Retrieve movie title from URL parameters
function loadMovieTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get("title");
    document.getElementById("movie-title").innerText = movieTitle;
}

function finalizeBooking() {
    const movieTitle = document.getElementById("movie-title").innerText;
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;

    if (!location || !time) {
        alert("Please select both location and time.");
        return;
    }

    document.getElementById("scheduling-form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("confirm-movie-title").innerText = movieTitle;
    document.getElementById("confirm-location").innerText = location;
    document.getElementById("confirm-time").innerText = time;
}

function goToDashboard() {
    window.location.href = "/dashboard"; // Adjust to your actual dashboard URL
}

// Load the selected movie title when page loads
window.onload = loadMovieTitle;

document.addEventListener('DOMContentLoaded', () => {
    const finalizeBookingButton = document.getElementById('finalize-booking');
    const seatMap = document.getElementById('seat-map');
    const seatNumbersInput = document.getElementById('seat-numbers');
    const takenSeats = ['A1', 'A2', 'B3']; // Example of taken seats
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 10;

    // Generate seat map
    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatNumber = `${row}${i}`;
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.innerText = seatNumber;

            if (takenSeats.includes(seatNumber)) {
                seat.classList.add('taken');
            }

            seat.addEventListener('click', () => {
                if (!seat.classList.contains('taken')) {
                    seat.classList.toggle('selected');
                    updateSeatNumbers();
                }
            });

            seatMap.appendChild(seat);
        }
    });

    // Update seat numbers input field
    function updateSeatNumbers() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const seatNumbers = Array.from(selectedSeats).map(seat => seat.innerText);
        seatNumbersInput.value = seatNumbers.join(', ');
    }

    // Handle the "Finalize Booking" button click
    finalizeBookingButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        const movieTitle = document.getElementById('movie-title').innerText;
        const location = document.getElementById('location').value;
        const time = document.getElementById('time').value;
        const quantity = document.getElementById('quantity').value;
        const seats = document.getElementById('seat-numbers').value;

        if (location && time && quantity && seats) {
            // Redirect to payment page with query parameters
            const url = `payment.html?movieName=${encodeURIComponent(movieTitle)}&location=${encodeURIComponent(location)}&time=${encodeURIComponent(time)}&quantity=${encodeURIComponent(quantity)}&seats=${encodeURIComponent(seats)}`;
            window.location.href = url;
        } else {
            alert('Please fill in all the details.');
        }
    });
});

// Load the selected movie title when page loads
window.onload = loadMovieTitle;
