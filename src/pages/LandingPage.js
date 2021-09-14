import React from 'react'

const LandingPage = () => {
    return (
        <div>
            <div style={{display: "flex", justifyContent:"flex-end"}}>
                    <a className="me-3 mt-2" href="/login">Entrar</a>
                    <a className="me-3 mt-2" href="/signup">Regístrarme</a>
            </div>
            <h1>Aquí va una landing page :D</h1>
        </div>
    )
}

export default LandingPage
