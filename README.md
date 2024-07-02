# The Asset Manager

The Asset Manager is a web application designed to help businesses manage their assets and products. This application enables HR Managers to track how employees are using company assets. 



## Live site:
- [The Asset Manager](https://asset-manager-54e54.web.app/)


## Admin Credentials:
* Username: mojogo9562@exeneli.com
* Password: Aa@1234


## Technologies Used:

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

### Payment Processing:
- [Stripe](https://stripe.com/)

### Deployment: 
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)


## Features:

1. **Comprehensive Asset Management:**
   - Easily manage both returnable and non-returnable assets.
   - Track asset usage by employees in real-time.

2. **User-Friendly Navigation:**
   - Dynamic navbar adjusts based on the user type (Employee or HR Manager).
   - Quick access to key features like asset requests, team management, and more.

3. **Employee and HR Manager Registration:**
   - Separate registration forms for employees and HR managers.
   - HR managers can select a subscription package during registration.

4. **Subscription Packages:**
   - Choose from three packages:
     - 5 members for $5
     - 10 members for $8
     - 20 members for $15

5. **Asset Requests Management:**
   - Employees can request assets and track their request status.
   - HR managers can approve, reject, and manage asset requests.

6. **Payment Integration:**
   - Secure payment processing via Stripe.
   - Increase member limits by purchasing additional packages.

7. **Search and Filter Functionality:**
   - Efficiently search and filter assets and requests.
   - Server-side implementation for optimized performance.

8. **Team Management:**
   - HR managers can add employees to their team.
   - View and manage team members with ease.

9. **Responsive Design:**
   - Mobile-friendly design ensures accessibility on all devices.
   - Attractive UI with Tailwind CSS for a modern look.

10. **Authentication and Security:**
    - Secure user authentication with Firebase.
    - Social login options for quick access.


### Environment Variables
```env
DB_USER=commonUser
DB_PASS=OuTFyLNBCpbTLjwR
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.0yjrwty.mongodb.net/theAssetManager?retryWrites=true&w=majority&appName=Cluster0"
ACCESS_TOKEN_SECRET=66304721f3f2904c9d2aa423456d2c55d2d23f266b040701dd85ef10ce562ad172f21b493a79b3f597ec5c5ac3df2425dcd65b225871882196e1fe88691b3c73
STRIPE_SECRET_KEY=sk_test_51PMALtRowRGxhINctNEQS099qoPmGhs42SdrXryI1T8Dw2NHA7Xh0lYmuvhJwF0zmP3DA0aTuhhNoi0QGqZ3m5P000czNohOc8
TRANSPORTER_EMAIL='taher83@gmail.com'
TRANSPORTER_PASS=pnoqehgriwuylqaw
VITE_IMGBB_API_KEY=7032122c38dbf52025f070b26ec2de91
```

### Firebase Configuration
```js
const firebaseConfig = {
  apiKey: "AIzaSyDP-OghiIvF69DAUOe5ZvmmFxpPTHr21ao",
  authDomain: "theassetmanager-fcbe9.firebaseapp.com",
  projectId: "theassetmanager-fcbe9",
  storageBucket: "theassetmanager-fcbe9",
  messagingSenderId: "1009746072949",
  appId: "1:1009746072949:web:cd89959158e59b32f1af3c"
};
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB
- Firebase account for authentication
- Stripe account for payment processing

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ataher83/asset-manager-server
    cd asset-manager-server
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `server` directory and add your environment variables.

4. Start the server:
    ```sh
    node server/server.js
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```sh
    cd client
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and go to `http://localhost:3000` to view the application.
2. Sign up as either an Employee or HR Manager.
3. HR Managers can manage assets, view requests, and handle employees.
4. Employees can view their assets, request new ones, and see their team.

## Project Structure

```
portfolio-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
├── server/
│   ├── .env
│   ├── server.js
```

## Features to Implement

1. **Navbar**: Different views for non-logged-in users, employees, and HR managers.
2. **Join as Employee**: Form for new employee registration.
3. **Join as HR Manager**: Form for new HR manager registration, including payment processing.
4. **Login**: Form for user login.
5. **Home Page**: Varies based on user type (non-logged-in, employee, HR manager).
6. **Employee Pages**: My Assets, Request for an Asset, My Team.
7. **HR Manager Pages**: Asset List, Add an Asset, All Requests, My Employee List, Add an Employee.

## Payment Processing

The application uses Stripe for handling payments. Make sure to use the provided test keys for development and testing purposes.

## Deployment

1. Set up your environment variables in a secure way for the production environment.
2. Deploy your frontend to a hosting service like Vercel or Netlify.
3. Deploy your backend to a hosting service like Heroku or DigitalOcean.
4. Update your frontend to point to your backend's production URL.

## Contact

For any questions or support, please contact [Taher](mailto:taher83@gmail.com).

---

This `README.md` should provide a comprehensive guide to setting up and running your project, "The Asset Manager". Let me know if you need any further assistance!