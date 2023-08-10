# Inspirations - Travel Itinerary Generator

An itinerary generator using AI that helps you plan your travel journeys hassle-free. Inspirations takes the stress out of finding activities and travel options by providing suggestions for destinations, travel legs, and activities, allowing you to create your own personalized journey.

## Table of Contents

- [Inspirations - Travel Itinerary Generator](#inspirations---travel-itinerary-generator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Learnings](#learnings)
  - [Contact](#contact)
  - [Roadmap](#roadmap)

## Installation

The project is hosted online. You can access it by visiting the [Inspirations Website](https://www.inspirations-travel.com](https://inspirations.onrender.com/).

## Usage

1. **Create an Account**: Sign up or log in using your Google or GitHub account. Your email and name are the only data stored, and they will not be shared.

2. **Create a Journey**: Once logged in, use the menu to create a new journey. Enter the basic trip information, and you'll have an itinerary with a start and end point.

3. **Add Travel Nodes**: Add various travel nodes like restaurants, destinations, sightseeing spots, etc. As you enter a location or place, the AI will suggest options that can be directly added to the itinerary.

4. **Add Travel Legs**: Connect travel nodes with travel legs. This generates travel options between the legs. The AI offers suggestions, and you can manually edit the data if needed.

5. **Refine and Customize**: Edit, delete, or reorder nodes and legs to refine your journey.

## Features

- Create and manage personalized travel itineraries.
- Add, remove, and modify travel nodes and legs.
- AI-powered suggestions for travel options and activities.
- Flexible customization to suit your preferences.

## Learnings

- Folder structure - as i worked on the app over time I was severely hampered by disorganised code and as a result gradually started moving into a more organised structure e.g. Splitting up contexts, router, sites/pages, services. I also learnt about feature driven folder surcture but Due to limited time and difficulty of reengineering i chose to continue with a pages appraoch.

- This app served as a the first major Typescript project that I have undertaken however it could have been utilised to a greater extent by delcaring more rigid interfaces/types rather than reuse existing types with optional parameters. More planning around types should have been done prior to any code entry.
- Splitting code more things into resueable components
  - Using and Reusing API call services / Mutations rather than redfining the queries at component level.
  - Context and Redux - The app was initially started before I had practical knowledge of Redux - in hindsight, due to the complex nature of states used across various features (some of which are currently not enabled), a redux store with actions/dispatch would have led to more orgainsed / clean code
  - I should have broken down simple components into a second level to create reuseable parts which accept props/styling rather than reuse base components. E.g. Styled components

Test driven approach would have greatly improve by confidence in testing for bugs, edge cases, functionality etc. but I did not posses the knowlege of testing when the app dvelopment was underway.

## Contact

For inquiries, feedback, or collaboration, you can reach out to the project owner at nikhil.mahashabde@gmail.com.

## Roadmap

Inspirations is a work in progress, and future enhancements include:

- User ability to modify trip details.
- Regenerate trip images.
- Public database of trips for non-authenticated users to browse.
- Display random trips on the home page.
- Convert trips to PDF for easy printing.
- Read-only view of trips for other users.
- Show last trip that the user was working on.
