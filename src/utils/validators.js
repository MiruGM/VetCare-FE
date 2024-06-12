//Validación para el correo electrónico
export const isValidEmail = (email) => {
    let regExpMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExpMail.test(email);
};

//Validación para la contraseña
export const isValidPassword = (password) => {
    let regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regExpPassword.test(password);
};

//Validación para el DNI
export const isValidDni = (dni) => {
    const regExpDni = /^\d{8}[A-Z]$/;
    return regExpDni.test(dni);
};

//Validación para el teléfono
export const isValidPhone = (phone) => {
    const regExpPhone = /^[6-9]\d{8}$/;
    return regExpPhone.test(phone);
};

//Validación para el número de chip
export const isValidChipNum = (chipNum) => {
    const regExpChipNum = /^\d{15}$/;
    return regExpChipNum.test(chipNum);
}

//Validación para el número de colegiado de los veterinarios
export const isValidRegistrationNumber = (registrationNumber) => {
    const regExpRegistrationNumber = /^\d{2}-\d{5}$/;
    return regExpRegistrationNumber.test(registrationNumber);
}

//Validación para el número de chip/registro de la mascota
export const isValidRegistrationNumberPet = (registrationNumber) => {
    const regExpRegistrationNumber = /^\d{15}$/;
    return regExpRegistrationNumber.test(registrationNumber);
}
