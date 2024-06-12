//Función para el estilo de la cita
export const getReason = (reason, appointmentDate) => {

    if (appointmentDate !== undefined && new Date(appointmentDate) < new Date()) {
        switch (reason.toLowerCase()) {
            case 'revisión':
                return 'reason-rev reason-rev__dull';
            case 'cirugía':
                return 'reason-cir reason-cir__dull';
            case 'vacunación':
                return 'reason-vac reason-vac__dull';
            case 'cura':
                return 'reason-cur reason-cur__dull';
            case 'muestras':
                return 'reason-mue reason-mue__dull';

            default:
                return '';
        }
    } else {

        switch (reason.toLowerCase()) {
            case 'revisión':
                return 'reason-rev';
            case 'cirugía':
                return 'reason-cir';
            case 'vacunación':
                return 'reason-vac';
            case 'cura':
                return 'reason-cur';
            case 'muestras':
                return 'reason-mue';

            default:
                return '';
        }
    }
};

//Estilos de botón de client profile
export const getButtonClass = (editable) => {
    if (editable) {
        return 'custom-btn__soft';
    }
}

//Estilos de la cita según la fecha
export const getDateClass = (date) => {
    const now = new Date();
    const appointmentDate = new Date(date);

    if (appointmentDate < now) {
        return 'custom-list-style__appointment-dull '; // Clase para fechas pasadas
    } else {
        return 'custom-list-style__appointment '; // Clase para fechas futuras
    }
}
