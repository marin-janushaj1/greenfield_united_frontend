// CSS class names used for manipulating DOM elements
const ORDER_1_CLASS = 'order-1';
const ACTIVE_SECTION_CLASS = 'active';
const WIDTH_FULL = 'w-100';

// Array of active class names
const ACTIVE_CLASSES = [
    ACTIVE_SECTION_CLASS,
    WIDTH_FULL
];

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