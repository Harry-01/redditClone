import React from 'react'
import { TextField, Button } from '@mui/material';
export default function SignUp() {
    const [formData, setFormData] = React.useState(
        { email: "", username: "", password: "", passwordConfirm: "" }
    )

    const [errors, setErrors] = React.useState({})

    function handleChange(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        console.log(typeof formData.password)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!validatePassword()) {
            console.log(errors)
        } else {
            
            const settings = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            console.log(settings)
            try {
                const fetchResponse = await fetch(`http://localhost:8000/api/users/auth/register`, settings);
                const data = await fetchResponse.json();
                return data;
            } catch (e) {
                return e;
            }
            
        }


    }

    function validatePassword() {
        let isValid = true
        let errors = {}
        if (!formData.password) {
            isValid = false;
            errors["password"] = "Please Enter your Password.";
        }

        if (!formData.passwordConfirm) {
            isValid = false;
            errors["passwordConfirm"] = "Please Enter your Confirm Password.";
        }

        if (typeof formData.password !== "undefined" && typeof formData.passwordConfirm !== "undefined") {
            if (formData.passwordConfirm != formData.password) {
                isValid = false
                errors["passwordMatch"] = "Confirm password does not match"
            }
        }

        setErrors(errors)
        return isValid
    }

    return (
        <form className="auth" onSubmit={handleSubmit}>
            <TextField
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                sx={{ margin: 3 }}
                value={formData.email}
                variant="standard" />

            <TextField
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                sx={{ margin: 3 }}
                value={formData.username}
                variant="standard" />
                
            {errors.password ?
                <TextField
                    error
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    sx={{ margin: 3 }}
                    value={formData.password}
                    helperText={errors.password}
                    variant="standard" /> :
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    sx={{ margin: 3 }}
                    value={formData.password}
                    variant="standard" />}

            {errors.passwordConfirm ?
                <TextField
                    error
                    type="password"
                    name="passwordConfirm"
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    sx={{ margin: 3 }}
                    value={formData.passwordConfirm}
                    helperText={errors.passwordConfirm}
                    variant="standard" /> :
                <TextField
                    type="password"
                    name="passwordConfirm"
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    sx={{ margin: 3 }}
                    value={formData.passwordConfirm}
                    variant="standard" />
            }
            {errors.passwordMatch ? <p>password does not match</p> : ""}
            <Button
                type="submit"
                variant="contained"
                sx={{ margin: 3 }}>Submit</Button>
        </form>
    )
}