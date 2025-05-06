
# Movie-Flix 🎬

Movie-Flix is a full-stack React.js application that fetches data from the TMDB (The Movie Database) API. It displays the top 20 trending movies and allows users to search for any movie. The app uses Appwrite as a backend for tracking searches and displays the top 5 most searched movies on the home page.

## Features

- 🎥 Shows top 20 trending movies using TMDB API.
- 🔍 Real-time search functionality.
- 📊 Tracks number of searches and displays top 5 most searched movies.
- ☁️ Uses Appwrite for backend services like database and project management.

## Getting Started

To run this app locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Movie-Flix.git
cd Movie-Flix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file in the root directory

Add the following environment variables:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

### 4. Run the development server

```bash
npm run dev
```

## Technologies Used

- React.js
- TMDB API
- Appwrite
- Vite

## License

This project is open source and available under the [MIT License](LICENSE).
