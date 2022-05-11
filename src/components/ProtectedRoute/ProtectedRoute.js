import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import React from "react"



const ProtectedRoute = ({ children, loggedIn }) => {
    return (
        <Route>
            {
                () => loggedIn ? children : <Redirect to='/signin' />

            }
        </Route>
    )
}

export default ProtectedRoute