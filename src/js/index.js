// CSS class names used for manipulating DOM elements
const ORDER_1_CLASS = 'order-1';
const ACTIVE_SECTION_CLASS = 'active';
const WIDTH_FULL = 'w-100';

// Array of active class names
const ACTIVE_CLASSES = [
    ACTIVE_SECTION_CLASS,
    WIDTH_FULL
];

// Backend URLs and endpoints
const MATCH_STRUCTURE_ENDPOINT = 'structures/match.html';
const EVENT_STRUCTURE_ENDPOINT = 'structures/event.html';
const GET_MATCHES_ENDPOINT = 'https://my-json-server.typicode.com/marin-janushaj1/greenfield_united_frontend/db';
const GET_EVENTS_ENDPOINT = 'https://my-json-server.typicode.com/marin-janushaj1/greenfield_united_frontend/db';
const CONTACT_US_ENDPOINT = 'http://127.0.0.1:8000/submit-form/';

// DOM element selections and event listeners
let sections = document.querySelector('.sections');
let activeSection = null;

sections.addEventListener('click', function (e) {
    let section = e.target.closest('section');
    toggleSection(section);
});

let links = document.getElementById('links');

links.addEventListener('click', function (e) {
    let target = e.target;
    let sectionToBeActivatedId = target.getAttribute('data-acivate-section-target');
    let sectionToBeActivated = document.getElementById(sectionToBeActivatedId);
    toggleSection(sectionToBeActivated);
});

// Function to activate a section
function activateSection(section) {
    section.classList.remove(ORDER_1_CLASS);
    ACTIVE_CLASSES.forEach(c => section.classList.add(c));

    window.scrollTo({
        top: document.querySelector('header').clientHeight,
        behavior: 'smooth'
    });
}

// Function to deactivate a section
function deactivateSection(section) {
    if (section) {
        section.classList.add(ORDER_1_CLASS);
        ACTIVE_CLASSES.forEach(c => section.classList.remove(c));
    }
}

// Function to toggle between active and inactive sections
function toggleSection(section) {
    if (section == activeSection) {
        return;
    }

    activateSection(section);
    deactivateSection(activeSection);

    activeSection = section;
}

// Function to fetch and render matches
async function renderMatches() {
    let matchesContainer = document.getElementById('matches');
    let matchStructure = await fetch(MATCH_STRUCTURE_ENDPOINT);
    let result = await matchStructure.text();

    const parser = new DOMParser();
    let structureElement = (parser.parseFromString(result, 'text/html')).querySelector('.match-container');

    fetch(GET_MATCHES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        let matches = data.matches;
        let homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, matchTime;

        matches.forEach(match => {
            let cloneStructure = structureElement.cloneNode(true);
            homeTeam = cloneStructure.querySelector('.home-team');
            homeTeam.textContent = match.home_team;

            awayTeam = cloneStructure.querySelector('.away-team');
            awayTeam.textContent = match.away_team;

            homeTeamScore = cloneStructure.querySelector('.home-team-score');
            homeTeamScore.textContent = match.home_team_score;

            awayTeamScore = cloneStructure.querySelector('.away-team-score');
            awayTeamScore.textContent = match.away_team_score;

            matchDate = cloneStructure.querySelector('.match-date');
            matchDate.textContent = match.match_date;

            matchTime = cloneStructure.querySelector('.match-time');
            matchTime.textContent = match.match_time;

            matchesContainer.append(cloneStructure);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        let errorMessage = 'An error occurred while fetching the matches. Please try again later.';
        alert(errorMessage);
    });
}

// Function to fetch and render events
async function renderEvents() {
    let eventContainer = document.getElementById('events');
    let eventStructure = await fetch(EVENT_STRUCTURE_ENDPOINT);
    let result = await eventStructure.text();

    const parser = new DOMParser();
    let structureElement = (parser.parseFromString(result, 'text/html')).querySelector('.event-card');

    let cardName, cardDate, cardTime, cardLocation, cardDescripiton, cardOrganizer, eventContact;

    fetch(GET_EVENTS_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        let events = data.communityEvents;

        events.forEach(event => {
            let cloneStructure = structureElement.cloneNode(true);

            cardName = cloneStructure.querySelector('.event-name');
            cardName.textContent = event.event_name;

            cardDate = cloneStructure.querySelector('.event-date');
            cardDate.textContent = event.event_date;

            cardTime = cloneStructure.querySelector('.event-time');
            cardTime.textContent = event.event_time;

            cardLocation = cloneStructure.querySelector('.event-location');
            cardLocation.textContent = event.location;

            cardDescripiton = cloneStructure.querySelector('.event-description');
            cardDescripiton.textContent = event.description;

            cardOrganizer = cloneStructure.querySelector('.event-organizer');
            cardOrganizer.textContent = event.organizer;

            eventContact = cloneStructure.querySelector('.event-contact');
            eventContact.textContent = event.contact_info;
            eventContact.setAttribute('href', event.contact_info);

            eventContainer.append(cloneStructure);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        let errorMessage = 'An error occurred while fetching the events. Please try again later.';
        alert(errorMessage);
    });
}

// Invoke functions to fetch and render matches and events on page load
renderMatches();
renderEvents();

/**
 * Contact us submission
 */
const contactUsForm = document.getElementById('contactUsForm');

contactUsForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    const plainFormData = Object.fromEntries(formData.entries());
    const jsonFormData = JSON.stringify(plainFormData);

    const response = await fetch(CONTACT_US_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonFormData,
    })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            let errorMessage = 'An error occurred while submitting the form. Please try again later.';
            alert(errorMessage);
        });

    const result = await response.json();
});