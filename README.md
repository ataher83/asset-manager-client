# The Asset Manager

The Asset Manager is a web application designed to help businesses manage their assets and products. This application enables HR Managers to track how employees are using company assets. 



## Live site
- [The Asset Manager](https://asset-manager-54e54.web.app/)


## Admin Credentials
* Username: mojogo9562@exeneli.com
* Password: Aa@1234


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

### Payment Processing:
- [Stripe](https://stripe.com/)

### Deployment: 
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)


## Features

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




## Environment Variables
### .env
```env
DB_USER=commonUser
DB_PASS=OuTFyLNBCpbTLjwR

ACCESS_TOKEN_SECRET=66304721f3f2904c9d2aa423456d2c55d2d23f266b040701dd85ef10ce562ad172f21b493a79b3f597ec5c5ac3df2425dcd65b225871882196e1fe88691b3c73

STRIPE_SECRET_KEY=sk_test_51PMALtRowRGxhINctNEQS099qoPmGhs42SdrXryI1T8Dw2NHA7Xh0lYmuvhJwF0zmP3DA0aTuhhNoi0QGqZ3m5P000czNohOc8

TRANSPORTER_EMAIL='taher83@gmail.com'
TRANSPORTER_PASS=pnoqehgriwuylqaw
```

### .env.local
```env
  VITE_apiKey=AIzaSyCeYG3jssEPYMaE8csSVP8aE0dCd8MTI0g 
  VITE_authDomain=asset-manager-54e54.firebaseapp.com
  VITE_projectId=asset-manager-54e54
  VITE_storageBucket=asset-manager-54e54.appspot.com
  VITE_messagingSenderId=997639771813
  VITE_appId=1:997639771813:web:2c136f94fe8d096c7d9f4c

  VITE_IMGBB_API_KEY=7032122c38dbf52025f070b26ec2de91
  VITE_API_URL=https://asset-manager-server.vercel.app  
  VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51PMALtRowRGxhINc8QSQrNT1UTXBXjubJNMGTP0rMfcn4SjAlaT4Kaffyid5wZQaeMeAPFr8idsekRCMDRzcQJLQ00giTMMPL9
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


## Run The Asset Manager in your Local Host

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
    ```

2. Navigate to the `asset-manager-server` directory:
    ```sh
    cd asset-manager-server
    ```

3. Install backend dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the `asset-manager-server` directory and add your environment variables.

5. Start the server:
    ```sh
    nodemon index.js
    ```

### Frontend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ataher83/asset-manager-client
    ```
2. Navigate to the `asset-manager-client` directory:
    ```sh
    cd asset-manager-client
    ```

3. Install frontend dependencies:
    ```sh
    npm install
    ```

4. Create a `.env.local` file in the `asset-manager-client` directory and add your environment variables.

5. Start the React development server:
    ```sh
    npm dev run
    ```

## Usage

1. Open your browser and go to `http://localhost:5000` to view the application.
2. Sign up as either an Employee or HR Manager.
3. HR Managers can manage assets, view requests, and handle employees.
4. Employees can view their assets, request new ones, and see their team.


## Contact

For any questions or support, please contact [Abu Taher](mailto:taher83@gmail.com).

