## Art Exhibition Curator

A web application that allows users to curate exhibitions by selecting artwork from **The Met Museum** and **Harvard Art Museums** APIs. Users can browse, search, and organize artworks into custom exhibitions.

## Visit the hosted application
https://github.com/Hugosuavez/exhibition-curator

## Features

- Search and browse artwork from **The Met Museum** and **Harvard Art Museums** APIs.
- Create, edit, and delete exhibitions.
- Add or remove artwork from exhibitions.
- View detailed artwork information.
- Responsive design for various screen sizes.

## Installation & Setup

### Clone the repository

- git clone https://github.com/Hugosuavez/exhibition-curator.git
- cd exhibition-curator

### Install dependencies

npm install

### Set up environment variables
- Harvard API requires an API key. Get one from Harvard Art Museums API.
- Create a .env file in the project root and add:

VITE_HARVARD_API_KEY=your_api_key_here

### Start the development server

- npm run dev
- Open the app in your browser at http://localhost:5173 (if using Vite).

### Technologies Used
- Frontend: React, React Router
- State Management && Data Fetching: React Hooks, TanStack Query
- APIs: The Met Museum API, Harvard Art Museums API
- Storage: Local Storage for exhibitions
- Build Tool: Vite

