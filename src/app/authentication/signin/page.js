'use client'
import { useState } from 'react';
import styles from './SignIn.module.css';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare form data (consider using FormData for multipart data)
            const { email, password } = formData;

            const data = { email, password }; // Plain object for simple data

            const response = await axios.post('http://localhost:5000/api/user/login', data, {
                headers: { // Optional headers for authentication, content type, etc.
                    'Content-Type': 'application/json',
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
            <h1>Sign In</h1>
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
                <button type="submit" className={styles.button}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
