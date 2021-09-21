import React from 'react'
import './LandingPage.css'

// Todo va dentro del "div"
// Entonces básicamente ud mete el html que quiera ahí dentro y le da clases para darle estilos sólo que en ves del atributo "class"
// usa el atributo "className"
const LandingPage = () => {
    return (
        <div>
            <div style={{display: "flex", justifyContent:"flex-end"}}>
                    <a className="me-3 mt-2" href="/login">Entrar</a>
                    <a className="me-3 mt-2" href="/signup">Regístrarme</a>
            </div>
            <h1>Aquí va una landing page :D</h1>
            <h2 className="lolcito">Viva el lolcito</h2>
        </div>
    )
}

export default LandingPage
