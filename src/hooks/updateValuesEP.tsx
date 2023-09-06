import React, { useState, useEffect } from 'react';
import updateValues from '../services/estudio-plaza/updateValues';


const useUpdateValuesEP = async (obj: {}, path: string, id: string, setLoad?: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoad && setLoad(true);
    return updateValues(obj, path, id);
};

export default useUpdateValuesEP; 