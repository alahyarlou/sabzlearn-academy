# **SabzLearn - Online Learning Platform**

### A modern and scalable platform to host and manage online courses for learners and educators.

---

## **Features**
- **User Management**: Secure user authentication and authorization (Admin and User roles).
- **Course Management**: Create, update, and organize courses with detailed descriptions and categories.
- **Session Management**: Add and manage course sessions with video uploads.
- **Interactive Learning**: Comments, ratings, and feedback on courses.
- **Mobile-Friendly**: Fully responsive design for a seamless experience on any device.

---

## **Tech Stack**
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Frontend**: React.js (or other, based on your project)
- **Database**: MongoDB
- **File Uploads**: Multer
- **Validation**: Fastest Validator
- **Authentication**: JWT (JSON Web Tokens)

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/sabzlearn-academy.git
cd sabzlearn-academy
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```plaintext
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### **4. Run the Application**
```bash
npm run dev
```
The server will run on `http://localhost:4000`.

---

## **Folder Structure**
```
sabzlearn-courses-platform/
├── controllers/         # Business logic for API endpoints
├── models/              # Mongoose schemas and models
├── routes/              # Application routes (API endpoints)
├── middlewares/         # Middleware for authentication and validation
├── utils/               # Utility functions (e.g., file upload configurations)
├── validators/          # Request validation schemas
├── public/              # Uploaded files (e.g., course covers, session videos)
├── .env                 # Environment variables
├── app.js               # Entry point of the application
└── package.json         # Project metadata and dependencies
```

---

## **Endpoints**

### **Courses**
- `POST /api/v1/courses` - Create a new course
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course details
- `PUT /api/v1/courses/:id` - Update a course
- `DELETE /api/v1/courses/:id` - Delete a course

### **Sessions**
- `POST /api/v1/sessions` - Create a session for a course
- `GET /api/v1/sessions/:id` - Get session details
- `PUT /api/v1/sessions/:id` - Update a session
- `DELETE /api/v1/sessions/:id` - Delete a session

### **Users**
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login
- `GET /api/v1/users/me` - Get user profile

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to your branch and create a pull request.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

## **Contact**
For questions or support, please reach out:
- **Email**: support@sabzlearn.com
- **Website**: [www.sabzlearn.ir](https://www.sabzlearn.ir)
