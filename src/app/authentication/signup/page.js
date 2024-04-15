'use client';
import { useState } from 'react';
import styles from './signup.module.css';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data validation (optional but recommended)
    // You can add checks for email format, password strength, etc.

    try {
      // Prepare form data (consider using FormData for multipart data)
      const { email, firstName, lastName, phoneNumber, password } = formData;
      const photo = formData.photo;

      let data;
      if (photo) {
        const formData = new FormData(); // Use FormData for file uploads
        formData.append('email', email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('password', password);
        formData.append('role', 'user');
        formData.append('coverImage', photo, photo.name); // Include file name
        data = formData;
      } else {
        data = { email, firstName, lastName, phoneNumber, password }; // Plain object for simple data
      }

      const response = await axios.post('http://localhost:5000/api/user', data, {
        headers: { // Optional headers for authentication, content type, etc.
          'Content-Type': photo ? 'multipart/form-data' : 'application/json',
        },
      });

      console.log('Signup response:', response.data); // Handle successful response

    } catch (error) {
      console.error('Signup error:', error); // Handle errors appropriately
      // You can display error messages to the user using state or a toast notification
    }
  };

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <label>
          Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
            className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
