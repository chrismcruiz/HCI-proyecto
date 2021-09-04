// Funciones frecuentemente utilizadas o útiles en diferentes componentes
 
export const filtrarUser = (obj, id) => {
    const user_obj = obj.filter((u) => u._id === id)
    return user_obj
}

export const recorrerObjeto = (obj) => {
    let user = ''
    for (let i = 0; i < obj.length; i++) {
        user = obj[i]
    }
    return user
}

export const calcularEdad = (anios) => {
    let hoy = new Date();
    let cumpleanos = new Date(anios);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  };