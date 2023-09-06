import React , { useEffect, useState }from 'react';
import { BoxView } from '../../../components/View/BoxViews';
import { db } from '../../../config/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { BoxStyled, CustomDiv, CustomDivForm } from '.';
import ObtenerValor from '../../../components/values-ep/listOfValues';
import useValuesEP from '../../../hooks/useValuesEP';
import { CustomInput } from '../../../components/input';
import { styled } from 'styled-components';
import { values } from '../../../hooks/useValuesEP';
import useActualiceDataEP from '../../../hooks/updateValuesEP';
import { useNavigate } from 'react-router-dom';
import { StyleButtonEP } from '.';

const BaseDeDatosPages = () => {
    const navigate = useNavigate();
    const [docId, setDocId] = useState('');
    const [loadValues, setLoadValues] = useState(false);
    const {values, loading} = useValuesEP(setDocId, loadValues, setLoadValues);
    const [newData, setNewData] = useState<values>({
        SelladoVivienda: '', 
        SelladoComercio: '', 
        PrecioCopias: '', 
        Honorarios: '', 
        IVA: '', 
        PrecioAveriguaciones: '',  
        SeguroMenor: '', 
        SeguroMayor: '', 
    });

    useEffect(()=> {
        if (values) {
            setNewData({
                SelladoVivienda: values.SelladoVivienda, 
                SelladoComercio: values.SelladoComercio, 
                PrecioCopias: values.PrecioCopias, 
                Honorarios: values.Honorarios, 
                IVA: values.IVA, 
                PrecioAveriguaciones: values.PrecioAveriguaciones,  
                SeguroMenor: values.SeguroMenor, 
                SeguroMayor: values.SeguroMayor, 
            })
        }
    }, [values]);

    const addToDB = () => {
        try {
             addDoc(collection(db, "values"), {
                SelladoVivienda: '0.60', // %
                SelladoComercio: '1.0', // %
                PrecioCopias: '3.20', // c/u
                Honorarios: '0.05', // alquiler x 36/37meses
                IVA: '0.21', // %
                PrecioAveriguaciones: '2000', // 
                SeguroMenor: '850', // si el inmueble es menor a 100mts
                SeguroMayor: '1450', // si el inmueble es mayor a 100mts
            });
        } catch (err) {
            console.log(err)
        }
    };

    const updateObjToDataBase = () => {
        useActualiceDataEP(newData,"values", docId, setLoadValues);
    }

    const handleChangeSelladoVivienda = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, SelladoVivienda: e.target.value});
    };

 
    const handleChangeSelladoComercio = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, SelladoComercio: e.target.value});
    };

    const handleChangePrecioCopias = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, PrecioCopias: e.target.value});
    };

    const handleChangeHonorarios = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, Honorarios: e.target.value});
    };
    const handleChangeIVA = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, IVA: e.target.value});
    };
    const handleChangePrecioAveriguaciones = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, PrecioAveriguaciones: e.target.value});
    };
    const handleChangeSeguroMenor = (e: any)=> {
        e.preventDefault();
        setNewData({... newData, SeguroMenor: e.target.value});
    };
    const handleChangeSeguroMayor = (e: any)=> {
        e.preventDefault();
        // const formatedValue = numberSeparation(e.target.value);
        setNewData({... newData, SeguroMayor: e.target.value});
    };


    return (
    <BoxView large='100vh'>        
        <BoxStyled large='800px' wide='700px'>
            <StyleButtonEP onClick={()=> navigate('/practice/estudio-plaza')}> Volver </StyleButtonEP>
            <DivCustom>
                <DivForm style={{display: 'flex', flexDirection: 'column', width: '300px', height: '400px', placeItems: 'center'}}>
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSelladoVivienda} placeholder='SelladoVivienda' />
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSelladoComercio} placeholder='SelladoComercio' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangePrecioCopias} placeholder='PrecioCopias' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeHonorarios} placeholder='Honorarios' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeIVA} placeholder='IVA' />
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangePrecioAveriguaciones} placeholder='PrecioAveriguaciones' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSeguroMenor} placeholder='SeguroMenor' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSeguroMayor} placeholder='SeguroMayor' /> 
                </DivForm>
                <StyleButtonEP onClick={() => updateObjToDataBase()}> Guardar los datos </StyleButtonEP>
                {/* <button onClick={() => addToDB()}> Guardar los datos </button> */}
            </DivCustom>
            <DivCustom style={{height: '250px'}}>
            {loading ? <h2>Cargando...</h2> : 
                ObtenerValor(values)
            }
            </DivCustom>
        </BoxStyled>
    </BoxView>)
};


export default BaseDeDatosPages;

const DivForm = styled(CustomDivForm)`
    input {
        margin: 8px 0;
    }

`
const DivCustom = styled(CustomDiv)`
    height: 550px;
    width: 400px;
`