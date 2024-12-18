const API_URL = 'db.json';
        const filmsList = document.getElementById('films');
        const titleEl = document.getElementById('title');
        const posterEl = document.getElementById('poster');
        const runtimeEl = document.getElementById('runtime');
        const showtimeEl = document.getElementById('showtime');
        const ticketsEl = document.getElementById('tickets');
        const buyTicketButton = document.getElementById('buy-ticket');

        let currentFilm = null;

        // Fetch film data from the API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const films = data.films;
                populateFilmMenu(films);
                showFilmDetails(films[0]);
            });

        function populateFilmMenu(films) {
            filmsList.innerHTML = '';
            films.forEach(film => {
                const li = document.createElement('li');
                li.textContent = film.title;
                li.className = 'film item';
                li.addEventListener('click', () => showFilmDetails(film));
                filmsList.appendChild(li);
            });
        }

        function showFilmDetails(film) {
            currentFilm = film;
            titleEl.textContent = film.title;
            posterEl.src = film.poster;
            runtimeEl.textContent = `Runtime: ${film.runtime} minutes`;
            showtimeEl.textContent = `Showtime: ${film.showtime}`;
            const availableTickets = film.capacity - film.tickets_sold;
            ticketsEl.textContent = `Available Tickets: ${availableTickets}`;
            buyTicketButton.disabled = availableTickets === 0;
        }

        buyTicketButton.addEventListener('click', () => {
            if (!currentFilm) return;

            const availableTickets = currentFilm.capacity - currentFilm.tickets_sold;

            if (availableTickets > 0) {
                currentFilm.tickets_sold += 1;
                showFilmDetails(currentFilm);
            }

            if (availableTickets - 1 === 0) {
                buyTicketButton.disabled = true;
            }
        });