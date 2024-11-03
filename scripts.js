import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books.slice();

//const starting = document.createDocumentFragment()

// for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
//     const element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `

//     starting.appendChild(element)
// }

/**
 * Renders a list of books to the page based on the provided data.
 * @param {Array} booksToRender - The list of book objects to display.
 * Purpose: To render a list of books to the page based on the provided data.
 * How It Works: This function takes an array of book objects, loops through each book, and creates HTML elements to show the book's title, author, and cover image.
 * Example: When the app starts, we call `renderBooks` with the first set of books to show them on the screen.
 */

function renderBooks(booksToRender) {
    const fragment = document.createDocumentFragment();

    for (const { author, id, image, title } of booksToRender) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);
}

// Initial render of the first page of books
renderBooks(matches.slice(0, BOOKS_PER_PAGE));



/* document.querySelector('[data-list-items]').appendChild(starting)

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)
*/

/**
 * Renders genre options to the genre dropdown menu.
 * @param {Object} genres - Object containing genre IDs and names.
 * Purpose: Adds genre options to the genre dropdown menu.
 * How It Works: It loops through all the available genres and adds each one as an option in the genre filter dropdown.
 * Example: This is called when the page loads to show all genre options in the dropdown.
 */
function renderGenres(genres) {
    const genreFragment = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreFragment.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreFragment.appendChild(element);
    }

    document.querySelector('[data-search-genres]').appendChild(genreFragment);
}

/**
 * Renders author options to the author dropdown menu.
 * @param {Object} authors - Object containing author IDs and names.
 * Purpose: Adds author options to the author dropdown menu.
 * How It Works: It loops through all available authors and adds each one as an option in the author filter dropdown.
 * Example: This function runs when the page first loads, so users can filter books by author right away.
 */
function renderAuthors(authors) {
    const authorFragment = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorFragment.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorFragment.appendChild(element);
    }

    document.querySelector('[data-search-authors]').appendChild(authorFragment);
}

// Initial render of genre and author dropdown menus
renderGenres(genres);
renderAuthors(authors);


// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.querySelector('[data-settings-theme]').value = 'night'
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
// } else {
//     document.querySelector('[data-settings-theme]').value = 'day'
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
// }

/**
 * Sets the theme of the page based on the user's selection.
 * @param {string} theme - The theme to apply to the page.
 * Purpose: Sets the color theme of the app to either day (light) or night (dark).
 * How It Works: This function changes CSS properties based on the user’s selected theme, updating colors for a dark or light background.
 * Example: If the user has set their system to dark mode, `setTheme` will automatically apply the night theme when the page loads.
 */
function setTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        document.querySelector('[data-settings-theme]').value = 'night';
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        document.querySelector('[data-settings-theme]').value = 'day';
    }
}

// Set initial theme based on user's preference
setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');


/** Toggles the visibility of an overlay.
* @param {string} selector - CSS selector for the overlay element.
* @param {boolean} isOpen - Determines if the overlay should be open or closed.
* Purpose: Opens or closes overlays (pop-ups) like the search or settings overlay.
* How It Works: It finds the overlay element using the selector and sets its `open` attribute based on `isOpen`.
* Example: This function is used by other functions to show or hide the search or settings overlays.
*/
function toggleOverlay(selector, isOpen) {
    document.querySelector(selector).open = isOpen;
}

/** Initializes event listeners for button interactions.
 * Initializes event listeners for button interactions.
 * Purpose: Sets up the main button click events across the app.
 * How It Works: Attaches click events to buttons like search, settings, and close, triggering functions to show or hide elements when users interact with the app.
 * Example: Called once at the start to ensure all buttons respond to clicks right away.
*/
function initializeEventListeners() {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => toggleOverlay('[data-search-overlay]', false));
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => toggleOverlay('[data-settings-overlay]', false));

    document.querySelector('[data-header-search]').addEventListener('click', () => {
        toggleOverlay('[data-search-overlay]', true);
        document.querySelector('[data-search-title]').focus();
    });

    document.querySelector('[data-header-settings]').addEventListener('click', () => toggleOverlay('[data-settings-overlay]', true));
    document.querySelector('[data-list-close]').addEventListener('click', () => toggleOverlay('[data-list-active]', false));
}

// Initialize event listeners
initializeEventListeners();


/** Filters books based on the provided filters.
 * @param {Object} filters - The filter criteria including title, author, and genre.
 * @returns {Array} - Array of books that match the filter criteria.
 * Purpose: Filters the list of books based on search criteria (title, author, genre).
 * How It Works: Checks each book to see if it matches the title, author, and genre chosen by the user. If a book meets the criteria, it’s added to the results.
 * Example: This is called every time the user submits a search form to get a new, filtered list of books.
 */
function filterBooks(filters) {
    return books.filter(book => {
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;

        return genreMatch && titleMatch && authorMatch;
    });
}

/** Handles the search form submission, filters books, and updates the book display.
 * @param {Event} event - The form submission event.
 * Purpose: Manages the search form’s submit action, applies filters, and updates the book display.
 * How It Works: Prevents the default form action, collects filter data, applies the `filterBooks` function, and calls `renderBooks` to show only the matching books.
 * Example: This is triggered when a user submits the search form, refreshing the displayed books based on the chosen filters.
 */
function handleSearchFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = filterBooks(filters);

    page = 1;
    matches = result;

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';
    renderBooks(result.slice(0, BOOKS_PER_PAGE));

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleOverlay('[data-search-overlay]', false);
}

// Attaach event listener to search form submission
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmission);


/** Handles pagination by displaying the next set of books.
 * Purpose: Manages pagination by loading the next set of books when the "Show More" button is clicked.
 * How It Works: Calculates the next set of books to display, updates the page count, and checks if more books are available.
 * Example: This function runs every time the user clicks "Show More," adding more books to the list until there are no more to show.
*/
function handlePagination() {
    const fragment = document.createDocumentFragment();
    const start = page * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;

    renderBooks(matches.slice(start, end));

    page += 1;

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
}

// Attach the pagination event listener
document.querySelector('[data-list-button]').addEventListener('click', handlePagination);


/** Displays the details of a selected book in the detail overlay.
 * @param {Object} book - The book object containing details to display.
 * Purpose: Displays detailed information for a selected book in a pop-up overlay.
 * How It Works: Opens the book detail overlay and fills it with information, such as the book’s title, author, publication year, and description.
 * Example: This function is called when the user clicks on a specific book to learn more about it.
*/
function displayBookDetails(book) {
    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = book.image;
    document.querySelector('[data-list-image]').src = book.image;
    document.querySelector('[data-list-title]').innerText = book.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = book.description;
}

/** Handles click events on book list to display book details.
 * @param {Event} event - The click event on the book list.
 * Purpose: Detects a click on any book and shows that book’s details.
 * How It Works: Finds the clicked book based on the event, retrieves the book data, and calls `displayBookDetails`.
 * Example: This function is triggered when a user clicks a book item, opening an overlay with that book's details.
 */
function handleBookListClick(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let selectedBook = null;

    for (const node of pathArray) {
        if (selectedBook) break;

        if (node?.dataset?.preview) {
            selectedBook = books.find(book => book.id === node.dataset.preview);   
        }
    }

    if (selectedBook) {
        displayBookDetails(selectedBook);
    }
}

// Attach the event listener for clicking on book items
document.querySelector('[data-list-items]').addEventListener('click', handleBookClick);



// document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
// document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

// document.querySelector('[data-list-button]').innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
// `

// document.querySelector('[data-search-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-header-search]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = true 
//     document.querySelector('[data-search-title]').focus()
// })

// document.querySelector('[data-header-settings]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = true 
// })

// document.querySelector('[data-list-close]').addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = false
// })

// document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const { theme } = Object.fromEntries(formData)

//     if (theme === 'night') {
//         document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//         document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//     } else {
//         document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//         document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//     }
    
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     const result = []

//     for (const book of books) {
//         let genreMatch = filters.genre === 'any'

//         for (const singleGenre of book.genres) {
//             if (genreMatch) break;
//             if (singleGenre === filters.genre) { genreMatch = true }
//         }

//         if (
//             (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
//             (filters.author === 'any' || book.author === filters.author) && 
//             genreMatch
//         ) {
//             result.push(book)
//         }
//     }

//     page = 1;
//     matches = result

//     if (result.length < 1) {
//         document.querySelector('[data-list-message]').classList.add('list__message_show')
//     } else {
//         document.querySelector('[data-list-message]').classList.remove('list__message_show')
//     }

//     document.querySelector('[data-list-items]').innerHTML = ''
//     const newItems = document.createDocumentFragment()

//     for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         newItems.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(newItems)
//     document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

//     document.querySelector('[data-list-button]').innerHTML = `
//         <span>Show more</span>
//         <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
//     `

//     window.scrollTo({top: 0, behavior: 'smooth'});
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-list-button]').addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()

//     for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(fragment)
//     page += 1
// })

// document.querySelector('[data-list-items]').addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null

//     for (const node of pathArray) {
//         if (active) break

//         if (node?.dataset?.preview) {
//             let result = null
    
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             } 
        
//             active = result
//         }
//     }
    
//     if (active) {
//         document.querySelector('[data-list-active]').open = true
//         document.querySelector('[data-list-blur]').src = active.image
//         document.querySelector('[data-list-image]').src = active.image
//         document.querySelector('[data-list-title]').innerText = active.title
//         document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         document.querySelector('[data-list-description]').innerText = active.description
//     }
// })