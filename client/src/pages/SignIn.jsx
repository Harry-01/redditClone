import React from 'react'
import { TextField, Button } from '@mui/material';

export default function SignIn() {
    const [formData, setFormData] = React.useState(
        {email: "", password: ""}
    )

    function handleChange(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const settings = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        console.log(settings)
        try {
            const fetchResponse = await fetch(`http://localhost:8000/api/users/auth/signin`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }    

        console.log(formData)

    }

    return (
        <form className="auth" onSubmit={handleSubmit}>
                <TextField
                    type="email" 
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    sx={{margin: 3}}
                    value={formData.email}
                    variant="standard" />

                <TextField
                    type="password" 
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    sx={{margin: 3}}
                    value={formData.password}
                    variant="standard" />

            <Button 
                type="submit" 
                variant="contained"
                sx={{margin: 3}}>Submit</Button>
        </form>
    )
}