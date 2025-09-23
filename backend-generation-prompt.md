
# Prompt for Generating a Node.js & MongoDB Backend for a Hospital Management System

## **Objective:**
Create a robust and scalable MVP backend for a Hospital Management System (HMS) using the MERN stack (MongoDB, Express.js, Node.js). This backend will serve a Next.js frontend with three distinct user roles: Admin, Doctor, and Patient.

## **Core Technologies:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose for Object Data Modeling)
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Use a library like `Joi` or `express-validator` for input validation.

---

## **1. Data Models (Mongoose Schemas)**

Define the following Mongoose schemas. Use appropriate data types, add `timestamps: true`, and establish references between models using `mongoose.Schema.Types.ObjectId`.

**A. `User` Schema:**
- `email`: String, required, unique, trim.
- `password`: String, required.
- `role`: String, required, enum: `['admin', 'doctor', 'patient']`.
- `name`: String, required.
- **Methods:** Include a method to compare passwords (e.g., using `bcrypt.js`).

**B. `Doctor` Schema:**
- `user`: ObjectId, ref: `User`, required.
- `specialization`: String, required.
- `experience`: String.
- `phone`: String, required.
- `availability`: String.

**C. `Patient` Schema:**
- `user`: ObjectId, ref: `User`, required.
- `age`: Number, required.
- `gender`: String.
- `disease`: String. // Represents the primary condition
- `doctorAssigned`: ObjectId, ref: `Doctor`.
- `contact`: String, required.

**D. `Appointment` Schema:**
- `patient`: ObjectId, ref: `Patient`, required.
- `doctor`: ObjectId, ref: `Doctor`, required.
- `date`: Date, required.
- `time`: String, required.
- `status`: String, required, enum: `['pending', 'confirmed', 'cancelled', 'completed']`, default: `'pending'`.
- `requirements`: String. // Optional notes from patient

**E. `Prescription` Schema:**
- `patient`: ObjectId, ref: `Patient`, required.
- `doctor`: ObjectId, ref: `Doctor`, required.
- `date`: Date, default: `Date.now`.
- `medicines`: Array of objects `[{ medicine: String, dosage: String }]`.
- `notes`: String.

**F. `MedicalReport` Schema:**
- `patient`: ObjectId, ref: `Patient`, required.
- `doctor`: ObjectId, ref: `Doctor`, required.
- `title`: String, required.
- `date`: Date, default: `Date.now`.
- `fileUrl`: String, required. // URL to the stored file

**G. `Bill` Schema:**
- `patient`: ObjectId, ref: `Patient`, required.
- `date`: Date, default: `Date.now`.
- `amount`: Number, required.
- `status`: String, enum: `['paid', 'pending']`, default: `'pending'`.
- `details`: String, required.
- `invoiceUrl`: String, required.

**H. `Feedback` Schema:**
- `patient`: ObjectId, ref: `Patient`, required.
- `doctor`: ObjectId, ref: `Doctor`, required.
- `rating`: Number, required, min: 1, max: 5.
- `comment`: String.
- `date`: Date, default: `Date.now`.

**I. `Staff` Schema:**
- `name`: String, required.
- `role`: String, required.
- `email`: String, required, unique.
- `phone`: String.

---

## **2. API Endpoints (Express Routes)**

Structure the API with role-based access control using JWT middleware.

### **Authentication (`/api/auth`)**
- `POST /login`: Authenticates a user (admin, doctor, or patient) with email and password. Returns a JWT.
- `GET /me`: Returns the profile of the currently logged-in user based on the JWT.

### **Admin Endpoints (`/api/admin`)** (Requires Admin Role)
- **Doctors Management:**
  - `POST /doctors`: Create a new doctor (and associated User).
  - `GET /doctors`: Get a list of all doctors.
  - `PUT /doctors/:id`: Update a doctor's details.
  - `DELETE /doctors/:id`: Delete a doctor.
- **Patients Management:**
  - `POST /patients`: Create a new patient (and associated User).
  - `GET /patients`: Get a list of all patients.
  - `PUT /patients/:id`: Update a patient's details.
  - `DELETE /patients/:id`: Delete a patient.
- **Appointments:**
  - `GET /appointments`: Get all appointments in the system.
- **Billing:**
  - `POST /bills`: Create a new bill for a patient.
  - `GET /bills`: Get all bills.
- **Staff:**
  - `POST /staff`: Add a new staff member.
  - `GET /staff`: Get all staff members.
  - `PUT /staff/:id`: Update a staff member.
  - `DELETE /staff/:id`: Delete a staff member.
- **Feedback:**
  - `GET /feedback`: View all patient feedback.
- **Dashboard Analytics:**
  - `GET /dashboard/stats`: An endpoint to fetch aggregate data for the admin dashboard (e.g., total patients, doctors, appointments).

### **Doctor Endpoints (`/api/doctor`)** (Requires Doctor Role)
- `GET /appointments`: Get appointments assigned to the logged-in doctor.
- `PUT /appointments/:id/status`: Update appointment status (e.g., confirm, cancel).
- `PUT /appointments/:id/reschedule`: Reschedule an appointment.
- `POST /prescriptions`: Create a new prescription for a patient.
- `GET /prescriptions`: Get prescriptions created by the logged-in doctor.
- `POST /reports/upload`: Upload a new medical report for a patient (handle file upload using `multer`).
- `GET /reports`: Get reports uploaded by the logged-in doctor.

### **Patient Endpoints (`/api/patient`)** (Requires Patient Role)
- `GET /appointments`: Get appointments for the logged-in patient.
- `POST /appointments`: Book a new appointment.
- `GET /prescriptions`: Get prescriptions for the logged-in patient.
- `GET /reports`: Get medical reports for the logged-in patient.
- `GET /bills`: Get bills for the logged-in patient.
- `POST /feedback`: Submit feedback for a doctor.

---

## **3. Core Logic and Middleware**

- **Authentication Middleware (`authMiddleware.js`):**
  - Create a middleware that verifies the JWT from the `Authorization` header.
  - It should decode the token, find the user in the database, and attach the user object to the request (`req.user`).
  - Protect routes by enforcing authentication.
- **Role-Based Access Control (RBAC) Middleware (`roleMiddleware.js`):**
  - Create a middleware that accepts a role (or array of roles) as an argument.
  - It should check if `req.user.role` is authorized to access the route.
- **File Uploads:**
  - Use `multer` to handle file uploads for medical reports and invoices. Configure it to store files either locally or on a cloud storage service (like Cloudinary or AWS S3) and save the URL to the database.
- **Error Handling:**
  - Implement a centralized error handling middleware to catch and respond to errors gracefully.

---

## **4. Initial Setup and Seeding**

- **Environment Variables (`.env`):**
  - `PORT`: Server port (e.g., 5000).
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for signing JWTs.
- **Seed Script (`/scripts/seed.js`):**
  - Create a script to populate the database with initial data, including:
    - One admin user.
    - A few doctor users and their corresponding `Doctor` profiles.
    - A few patient users and their corresponding `Patient` profiles.
  - Make sure to hash the passwords before saving them.

By following this prompt, you will build a comprehensive backend that fully supports the functionality observed in the frontend application.
