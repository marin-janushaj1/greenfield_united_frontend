# 1ITF & 1ACS Full Stack Essentials (2023-2024)

## Name Marin Janushaj

- **GitHub Repo**: [https://github.com/marin-janushaj1/greenfield_united_frontend](https://github.com/marin-janushaj1/greenfield_united_frontend)
- **Netlify Hosting**: [https://fcgreenfieldunited.netlify.app](https://fcgreenfieldunited.netlify.app)

This is an **<u>individual</u>** project! Any form of copying or collaboration is strictly prohibited.

# Documentation of the Greenfield United frontend

## Constants and Configuration

- **ORDER_1_CLASS**: A string constant representing a CSS class name used for ordering elements.
- **ACTIVE_SECTION_CLASS**: A string constant representing a CSS class name for active sections.
- **WIDTH_FULL**: A string constant representing a CSS class name for full width.
- **ACTIVE_CLASSES**: An array of active class names to be applied to sections.
- **BACKEND_URL**: The base URL for the backend server.
- **MATCH_STRUCTURE_ENDPOINT**: Endpoint for fetching the match structure HTML.
- **EVENT_STRUCTURE_ENDPOINT**: Endpoint for fetching the event structure HTML.
- **GET_MATCHES_ENDPOINT**: Endpoint for fetching match data from the local server.
- **GET_EVENTS_ENDPOINT**: Endpoint for fetching event data from the local server.
- **CONTACT_US_ENDPOINT**: Endpoint for submitting the contact form data.

## DOM Manipulation and Event Handling

- **sections**: Selects the DOM element with the class `.sections`.
- **activeSection**: Stores the currently active section.

**Event Listener for Sections**:
- Attaches a click event listener to the `sections` element.
- Toggles the section when clicked.

**Event Listener for Links**:
- Selects the DOM element with the ID `links`.
- Attaches a click event listener to the `links` element.
- Activates the section based on the data attribute `data-acivate-section-target`.

## Functions

**activateSection(section)**:
- Removes the `ORDER_1_CLASS` from the section.
- Adds classes from `ACTIVE_CLASSES` to the section.
- Applies a transition effect to the section's width.
- Scrolls smoothly to the top of the header.

**deactivateSection(section)**:
- Adds the `ORDER_1_CLASS` to the section.
- Removes classes from `ACTIVE_CLASSES` from the section.

**toggleSection(section)**:
- Toggles between activating and deactivating the section.
- Prevents toggling if the section is already active.

## Fetching and Rendering Matches

**renderMatches()**:
- Fetches the match structure HTML and parses it.
- Fetches match data and dynamically populates the match elements.
- Appends the populated match elements to the `matchesContainer`.

## Fetching and Rendering Events

**renderEvents()**:
- Fetches the event structure HTML and parses it.
- Fetches event data and dynamically populates the event elements.
- Appends the populated event elements to the `eventContainer`.

## Contact Us Form Submission

**Contact Us Form Submission**:
- Selects the contact form with the ID `contactUsForm`.
- Attaches a submit event listener to the form.
- Prevents the default form submission.
- Collects form data and sends it to the backend as a JSON object.
- Handles errors by displaying an alert message.

## Invoking Functions

- **renderMatches()**: Fetches and renders matches on page load.
- **renderEvents()**: Fetches and renders events on page load.