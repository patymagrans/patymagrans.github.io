import React from "react";
import { Link } from "gatsby";

const Button = ({ to, target, mt, marginTop, mb, marginBottom, onClick, children }) => (
    <Link to={to} target={target} role="group">
        <div>
            {children}
        </div>
    </Link>
)

export default Button
