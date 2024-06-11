//Función para el estilo de la cita
export const getReason = (reason) => {
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
};

//Función para el estilo de la cita pasada
export const getReasonDull = (reason) => {
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
};
