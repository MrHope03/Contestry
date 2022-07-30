import NavBar from "./navbar";
import React from "react";

export default function Layout({ children, login, setLogin }) {
    return (
        <div>
            <NavBar login={login} setLogin={setLogin}/>
            {
                React.Children.map(children,child => {
                    return React.cloneElement(child,{login,setLogin})
                })
            }
        </div>
    );
}
