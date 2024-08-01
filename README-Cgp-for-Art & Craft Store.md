# Art & Craft Store

The Art & Craft Store is a web application designed to showcase and sell various art and craft items within the "Painting and Drawing" category. This project focuses on a specific category of art and craft, providing users with a dedicated platform to explore and manage their artistic creations.

## Live Site
- [Art & Craft Store](your-live-site-url-here)

<!-- ## Admin Credentials
* Username: your-admin-username
* Password: your-admin-password -->

## Technologies Used

### Frontend:
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend:
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)

### Database:
- [MongoDB](https://www.mongodb.com/)

### Authentication:
- [Firebase](https://firebase.google.com/)

### Deployment:
- [Vercel](https://vercel.com/)

## Features

1. **Comprehensive Craft Item Management:**
   - Easily manage various painting and drawing items.
   - Track item details and user interactions.

2. **User-Friendly Navigation:**
   - Dynamic navbar adjusts based on the user authentication status.
   - Quick access to key features like item addition, item listing, and user-specific actions.

3. **User Registration and Authentication:**
   - Secure registration and login with email/password and Google authentication.
   - User-friendly forms with validation and error handling.

4. **Responsive Design:**
   - Fully responsive design for mobile, tablet, and desktop views.
   - Modern and attractive UI with TailwindCSS.

5. **Protected Routes:**
   - Secure routes for adding, updating, and viewing personal craft items.
   - Ensures user data privacy and security.

6. **Dynamic Data Fetching:**
   - All craft items are dynamically fetched from a MongoDB database.
   - Efficient data handling and presentation.

7. **Interactive UI:**
   - User-friendly interface with toast notifications for actions like add, update, and delete.
   - Intuitive design for easy navigation and interaction.

8. **Dark/Light Theme Toggle:**
   - Toggle between dark and light themes for a personalized experience.

9. **Loading Spinner:**
   - Displays a loading spinner while data is being fetched for a seamless user experience.

10. **Custom 404 Page:**
    - Custom 404 page for non-existent routes ensuring better error handling.

## Environment Variables

### .env
```env
DB_USER=your_db_user
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_access_token_secret
```

### .env.local
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_URL=your_api_url
```

### Firebase Configuration
```js
const firebaseConfig = {
  apiKey: "your_firebase_api_key",
  authDomain: "your_firebase_auth_domain",
  projectId: "your_firebase_project_id",
  storageBucket: "your_firebase_storage_bucket",
  messagingSenderId: "your_firebase_messaging_sender_id",
  appId: "your_firebase_app_id"
};
```

## Run Art & Craft Store on Your Local Host

### Prerequisites
- Node.js and npm
- MongoDB
- Firebase account for authentication

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/art-craft-store-server
    ```

2. Navigate to the `art-craft-store-server` directory:
    ```sh
    cd art-craft-store-server
    ```

3. Install backend dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the `art-craft-store-server` directory and add your environment variables.

5. Start the server:
    ```sh
    nodemon index.js
    ```

### Frontend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/art-craft-store-client
    ```

2. Navigate to the `art-craft-store-client` directory:
    ```sh
    cd art-craft-store-client
    ```

3. Install frontend dependencies:
    ```sh
    npm install
    ```

4. Create a `.env.local` file in the `art-craft-store-client` directory and add your environment variables.

5. Start the React development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and go to `http://localhost:5000` to view the application.
2. Sign up as a user and explore the various features.
3. Add, view, and manage craft items within the selected category.

## Contact

For any questions or support, please contact [Your Name](mailto:your-email@example.com).
```

Feel free to adjust the placeholders like `your-live-site-url-here`, `your-admin-username`, `your-admin-password`, and the environment variables with your actual project details.