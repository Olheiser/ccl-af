import React from "react";
import Link from "next/link";

interface ButtonProps {
    link: string;
    text: string;
  }

const Button: React.FC<ButtonProps> = ({link, text}) => {
    return (
        <Link href={link} className="generalButtonLink">
            <button className="generalButton">{text}</button>
        </Link>
    )
}

export default Button;