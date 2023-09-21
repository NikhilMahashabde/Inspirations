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
  - [User Stories (External Link)](https://github.com/NikhilMahashabde/Inspirations/blob/main/UserStories.md)
  - [Wireframes (External Link)](https://github.com/NikhilMahashabde/Inspirations/blob/main/Wireframes.md)

## Installation

The project is hosted online. You can access it by visiting the my personal domain [Inspirations Website](https://inspirations.nikhilmahashabde.com/). 

If the AWS server is not online, please try [Inspirations Website](https://inspirations.onrender.com/). Allow 45-60 seconds for the server to start up, while waiting - you can read all about the app and tech stack below!

## Usage

1. **Create an Account**: Sign up or log in using your Google or GitHub account. Your email and name are the only data stored, and they will not be shared.
   
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/910bd6ec-8b6d-40cc-8599-e758cd0e2e7e.jpg" alt="Image Description" width="50%">

3. **Create a Journey**: Once logged in, use the menu to create a new journey. Enter the basic trip information, and you'll have an itinerary with a start and end point.
   
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/df4d3e2f-fc93-458a-acaa-58882f6e513b.jpg" alt="Image Description" width="50%">

5. **Add Travel Leg Nodes**: Add various travel nodes like restaurants, destinations, sightseeing spots, etc. You can manually enter a node by filling out the form details or use the AI suggestion by entering a location and letting the AI add a suggestion directly to the itinerary.
   
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/b5e2141c-e4a4-4b22-ad16-1f09d338678f" alt="Image Description" width="50%">
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/7d5f80ae-ddfe-480a-9615-ebb2a8b1df4a" alt="Image Description" width="50%">
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/768879b3-16bb-46e4-84ab-76763cb47dd6" alt="Image Description" width="50%">

7. **Optional - Add Travel Options between Destinations**: Connect travel leg nodes with travel options. You can only add travel options between two destinations/nodes - Similar to above, adding a Leg can be done manually or using the AI tool.
   
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/6f6588c5-c102-4c7c-a9bb-346a24aa65fb" alt="Image Description" width="50%">

9. **Refine and Customize**: Edit, delete, reorder nodes and legs to refine your journey.
    
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/f551c3c9-3dcc-4358-8d93-c3ce8e022523" alt="Image Description" width="50%">

11. **Print your travel plan**: Print or save your PDF travel plan for convenience.
    
   <img src="https://github.com/NikhilMahashabde/Inspirations/assets/126232737/0b9d0ea9-dfc0-4e39-96c1-6e2b0bedf14a" alt="Image Description" width="50%">

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

### Deployment / Devops

- **Server** - AWS EC2 **: This site is deployed on my personal domain hosted on AWS using an Amazon linux EC2 instance.
- **Domain** - A domain name was purchased and registered with AWS. Nameservers were setup to enable redirect
- **NGINX** - NGINX is used a reverse proxy in order to route various subdomains and map them to various docker conatiners running seperate apps.
- **SSL/TLS** - HTTPS was enabled using letsencrypt and Certbot - this was a mandatory step as the auth provider (auth0) only accepts https requests and redirect/callback
- **Docker** - Docker is used to host the NodeJS-alpine server.
- **AWS Route 53** Used to map various subdomains to the main public IP address

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


## Personal Reflection and Lessons Learned

Undertaking this project marked a significant milestone in my journey, representing my first major experience with Typescript. Looking back, I realize that the project's potential could have been unlocked further through the establishment of rigorous interfaces and types. Relying on existing types with optional parameters, in retrospect, fell short of achieving the clarity that could have been attained. A more proactive approach to type planning before plunging into code development would have been invaluable.

As the application's complexity grew, a fundamental shift occurred in my perspective. Quality emerged as the paramount consideration over the mere accumulation of features. This realization illuminated a host of techniques that had initially escaped my attention:

- **Testing for Edge Cases:** I grasped the pivotal significance of rigorous testing, particularly for edge cases that could trigger component failures. This included defining input constraints, accommodating varying page view sizes, and implementing robust data input validation and error handling mechanisms.

- **Error Handling Excellence:** Creating refined error messages and adopting error-handling best practices emerged as essential components of successful development.

- **Effective Version Control:** I came to appreciate the value of meticulous version control practices. This led to the creation of more GitHub issues, branches, and improved commit messages.

- **Thorough Documentation:** Recognizing the importance of documenting changes for each feature, API, and interface became clear. This practice maintained clarity and cohesion within the project.

- **Structured Folder Approach:** My project's folder structure underwent a transformation, mirroring my growth. Moving from disorganized beginnings to a more structured layout involved dividing contexts, routers, site pages, and services. While I explored the idea of a feature-driven folder structure, practical constraints led me to maintain a pages-centric approach due to time limitations and reengineering complexities.

- **Modular Component Design:** I realized the potential of modular component design and advocated for the reuse of API call services and mutations over redundant queries at the component level. This highlighted the importance of efficient resource utilization.

- **Context and Redux Insight:** The project's evolving complexity led me to comprehend the benefits of Redux, a state management tool. In retrospect, adopting a Redux store with actions and dispatch mechanisms could have significantly enhanced code organization.

- **Enhanced Component Structure:** I recognized the elegance of breaking down simple components into secondary layers. This approach fostered reusability, granting the flexibility to accept props and styling, rather than relying solely on basic components.

Regarding testing, I now understand the significant potential of a test-driven approach. It could have greatly bolstered my confidence in addressing bugs, edge cases, and overall functionality. Regrettably, my understanding of testing was not comprehensive during the app's development.

In conclusion, this journey not only resulted in a functional application but also imparted invaluable lessons. These insights include meticulous planning, coherent code organization, comprehensive testing, and an unwavering commitment to development quality. As I carry these lessons forward, I am confident that my future projects will be executed with enhanced precision and success.


## Contact

For inquiries, feedback, or collaboration, feel free to reach out to the project owner at [nikhil.mahashabde@gmail.com](mailto:nikhil.mahashabde@gmail.com).

## Roadmap

Inspirations is an ongoing project, with planned future enhancements including:

- Adding more comprehensive unit testing and integration testing.
- Allowing users to modify trip details.
- Regenerating trip images.
- Introducing a public database of trips for non-authenticated users to browse.
- Displaying random trips on the home page.
- Offering a read-only view of trips for other users.
- Showcasing the last trip that the user was working on.

