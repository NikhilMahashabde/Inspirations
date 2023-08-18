# Inspirations - Travel Itinerary Generator

An itinerary generator using AI that helps you plan your travel journeys hassle-free. Inspirations takes the stress out of finding activities and travel options by providing suggestions for destinations, travel legs, and activities, allowing you to create your own personalized journey.

<img src="https://user-images.githubusercontent.com/126232737/261521733-910bd6ec-8b6d-40cc-8599-e758cd0e2e7e.png" alt="Image 1" style="width: 50%;"><img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/bb552c89-3146-4af4-bec7-be611023f9a7.png" alt="Image 2" style="width: 50%;">


## Table of Contents

- [Inspirations - Travel Itinerary Generator](#inspirations---travel-itinerary-generator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Key technologies used](#key-technologies-used)
  - [Learnings and Personal Feedback](#learnings-and-personal-feedback)
  - [Contact](#contact)
  - [Roadmap](#roadmap)

## Installation

The project is hosted online. You can access it by visiting the [Inspirations Website](https://www.inspirations-travel.com](https://inspirations.onrender.com/). Please allow 45-60 seconds for the server to start up, while waiting - you can read all about the app and tech stack below!

## Usage

1. **Create an Account**: Sign up or log in using your Google or GitHub account. Your email and name are the only data stored, and they will not be shared.
<img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/910bd6ec-8b6d-40cc-8599-e758cd0e2e7e.jpg" alt="Image Description" style="width: 50%;">

3. **Create a Journey**: Once logged in, use the menu to create a new journey. Enter the basic trip information, and you'll have an itinerary with a start and end point.
<img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/df4d3e2f-fc93-458a-acaa-58882f6e513b.jpg" alt="Image Description" style="width: 50%;">

5. **Add Travel Leg Nodes**: Add various travel nodes like restaurants, destinations, sightseeing spots, etc. You can manually enter a node by filling out the form details or use the AI suggestion by entering a location and letting the AI add a suggestion directly to the itinerary.
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/b5e2141c-e4a4-4b22-ad16-1f09d338678f)
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/7d5f80ae-ddfe-480a-9615-ebb2a8b1df4a)
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/768879b3-16bb-46e4-84ab-76763cb47dd6)

7. **Optional - Add Travel Options between Destinations**: Connect travel leg nodes with travel options. You can only add travel options between two destiantions/nodes - Similair to above, adding a Leg can be done manually or using the AI tool.
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/6f6588c5-c102-4c7c-a9bb-346a24aa65fb)

8. **Refine and Customize**: Edit, delete, reorder nodes and legs to refine your journey.
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/f551c3c9-3dcc-4358-8d93-c3ce8e022523)

9. **Print your travel plan** : Print or save your PDF travel plan for convinience
![image](https://github.com/NikhilMahashabde/Inspirations/assets/126232737/0b9d0ea9-dfc0-4e39-96c1-6e2b0bedf14a)

## Features

- Create and manage personalized travel itineraries.
- Add, remove, and modify travel nodes and legs.
- AI-powered suggestions for travel options and activities.
- Flexible customization to suit your preferences.
- PDF Printable travel plan

## Key Technologies Used

### Front-End

- **React with Typescript:** Using TypeScript adds static typing which helps catch errors, allows for clear interface implementation and enables autocomplete.

- **ChakraUI, Orbit-Components:** UI component libraries like ChakraUI and Orbit provide pre-styled and reusable components, speeding up the development process and maintaining consistent design.

- **React-to-Print:** This library allows you to easily create a printable version of your React components, which was crucial for generating the itinerary documents.

- **React-Query:** A data-fetching library for React that simplified managing asynchronous data and API calls. Useful for retrieving and managing data and rendering conditional views during load and failure.

### Back-End

- **NodeJS with Typescript:** Node.js is used for building the server-side of your application. TypeScript enhances code quality and maintainability by adding static types, similair to React. 

- **Express:** Express.js is a web application framework for Node.js. It simplifies routing, middleware handling, and request/response management.

- **Sessions, JWTs (JSON Web Tokens):** These are essential for user authentication and authorization. Sessions maintain user state, while JWTs provide a secure way handle the Auth0 Tokens and securely transmit user information between client and server

### External APIs

- **OpenAI:** OpenAI's API is used to generate trip related suggestion content.

- **Auth0:** Auth0 provides a platform for implementing authentication and authorization in thee application, offering features like single sign-on (SSO) and social login. Drastically simplifies the sign up process for new users. 

- **Unsplash API:** This API allows you to fetch high-quality images for displaying in your application, enhancing the visual appeal and user experience.

### Database

- **MongoDB with Mongoose ODM:** MongoDB is a NoSQL database that's suitable for storing structured and semi-structured data, like user information, itineraries, and preferences. Mongoose simplifies interactions with MongoDB by providing a schema-based model system and handling tasks like validation and data manipulation.

### Communication

- **Rest APIs:** Rest APIs are used to enable communication between different components of my front-end. React components make requests to the Node.js backend to fetch data, authenticate users, update app state and generate the itinerary information by interacting with the database.

### Testing

- **Unit testing with ViTest:** Unit testing is crucial for maintaining code quality and preventing regressions. It was mainly used for unit testing React Components. 


## Learnings and Personal Feedback

- This app served as a the first major Typescript project that I have undertaken however it could have been utilised to a greater extent by delcaring more rigid interfaces/types rather than reuse existing types with optional parameters. More planning around types should have been done prior to any code entry.

- Focusing on development/code quality not quantity/features - As the app grew larger I realised the value of many techniques that I initially did not pay enough attention to e.g.

  - Rigorously testing for edge cases and thinking of conditions that would lead to broken components such as
    - Setting limits on inputs
    - Page view sizes
    - Data input types / validation / Error checking
  - Creating better error messages, handling and displaying errors appropriately
  - Creating more Github 'issues', branches and better commit messages.
  - Documenting changes for each feature, API, interfaces etc.

- Folder structure - as i worked on the app over time I was severely hampered by disorganised code and as a result gradually started moving into a more organised structure e.g. Splitting up contexts, router, sites/pages, services. I also learnt about feature driven folder surcture but Due to limited time and difficulty of reengineering i chose to continue with a pages appraoch.
- - Splitting code more things into resueable components
  - Using and Reusing API call services / Mutations rather than redfining the queries at component level.
  - Context and Redux - The app was initially started before I had practical knowledge of Redux - in hindsight, due to the complex nature of states used across various features (some of which are currently not enabled), a redux store with actions/dispatch would have led to more orgainsed / clean code
  - I should have broken down simple components into a second level to create reuseable parts which accept props/styling rather than reuse base components. E.g. Styled components

Test driven approach would have greatly improve by confidence in testing for bugs, edge cases, functionality etc. but I did not posses the knowlege of testing when the app dvelopment was underway.

## Contact

For inquiries, feedback, or collaboration, you can reach out to the project owner at nikhil.mahashabde@gmail.com.

## Roadmap

Inspirations is a work in progress, and future enhancements include:

- Add more unit testing and integration testing
- User ability to modify trip details.
- Regenerate trip images.
- Public database of trips for non-authenticated users to browse.
- Display random trips on the home page.
- Read-only view of trips for other users.
- Show last trip that the user was working on.
