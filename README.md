# service-provider-webapp  (Trusty Tasker)
A MERN stack-based service provider marketplace that allows users to offer, view, and book various services such as labor, carpenter, mechanic, electrician, cable operator, and plumber. Users can manage their services, bookings, and profile through a comprehensive dashboard.

## Features
- User Registration and Login
- View and Offer Services
- Book Services
- Manage Services and Bookings
- Service Reviews and Ratings
- User Profile Management
- Messaging System
- Real-time Notifications (future feature)
- Payment System Integration (future feature)

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: CSS

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ubaid555/service-provider-webapp
   cd service-provider-webapp

2. **Install Dependencies:**
   //For Frontend Installation
    cd ../frontend
    npm install

   //For Backend Installation
   npm install  
   
4. **Set up environment variables:**
   Create a .env file in the root folder with the following:

       MONOGO_DB_URL=your_mongodb_uri
       JWT_SECRET=your_jwt_secret
       AUTH_EMAIL=your_auth_email
       AUTH_PASS=your_pass

6. **Run the application:**
     //For Frontend
        cd ../frontend
        npm start

    //For Backend Installation
         npm run server
   
8. **Run the application:**
   Open your browser and go to http://localhost:3000

