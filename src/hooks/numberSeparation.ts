const numberSeparation = (arr: number) => {
    const formateador = new Intl.NumberFormat('es-ES');
    
    return formateador.format(arr);
};
const reverseNumberSeparation = (str: string) => {
    // Elimina el separador de miles y convierte la cadena en un número
    const numberWithoutSeparator = parseFloat(str.replace(/[,\.]/g, ''));
    return numberWithoutSeparator;
};

export {numberSeparation, reverseNumberSeparation};