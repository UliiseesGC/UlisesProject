import React, { useState, useEffect } from 'react';
import GetValues from '../services/estudio-plaza/getValues';

export type values = {
    SelladoVivienda: string, 
    SelladoComercio: string, 
    PrecioCopias: string, 
    Honorarios: string, 
    IVA: string, 
    PrecioAveriguaciones: string,
    SeguroMenor: string, 
    SeguroMayor: string, 
}

const useValuesEP = (setDocId?: React.Dispatch<React.SetStateAction<string>>, load?: boolean, setLoad?: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState<values>({
        SelladoVivienda: '', 
        SelladoComercio: '', 
        PrecioCopias: '', 
        Honorarios: '', 
        IVA: '', 
        PrecioAveriguaciones: '',  
        SeguroMenor: '', 
        SeguroMayor: '', 
    });

    useEffect(()=>{
        setLoading(true);
        GetValues().then((res)=>{
            if (Array.isArray(res)) {
                console.log("res no valida");
            } else {
                try {
                    setValues({
                        SelladoVivienda: res.data.SelladoVivienda, 
                        SelladoComercio: res.data.SelladoComercio, 
                        PrecioCopias: res.data.PrecioCopias, 
                        Honorarios: res.data.Honorarios, 
                        IVA: res.data.IVA, 
                        PrecioAveriguaciones: res.data.PrecioAveriguaciones,  
                        SeguroMenor: res.data.SeguroMenor, 
                        SeguroMayor: res.data.SeguroMayor, 
                    }
                    );
                     setDocId && setDocId(res.id);
                    setLoading(false);
                    if (load) {
                        setLoad && setLoad(false);
                    };
                } catch (err){
                    console.log('error en useValues: ', err);
                }
            };
        });
    }, [load])

    return {values, loading}
};


export default useValuesEP; 