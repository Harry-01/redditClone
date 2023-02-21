import React from 'react'
import { Link, resolvePath, useResolvedPath, useMatch } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {

    return (
        <nav>
            <Link className="home" to ="/"> Site Name</Link>
            <ul>
                <CustomLink to="/signup">Sign Up</CustomLink>
                <CustomLink to="/signin">Sign In</CustomLink>
            </ul>
        </nav>

    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}