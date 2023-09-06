import React, {useEffect, useState} from 'react';
import { BoxView } from '../../../components/View/BoxViews';
import { CustomInput } from '../../../components/input';
import styled from 'styled-components';
import { PaletColor } from '../../../components/View/style';
import { useNavigate } from 'react-router-dom';
import Values from '../../../components/values-ep';
import ObtenerValor from '../../../components/values-ep/listOfValues';
import {numberSeparation, reverseNumberSeparation} from '../../../hooks/numberSeparation';
import useValuesEP from '../../../hooks/useValuesEP';

const INITIAL_VALUES = {
    Inmueble: ['vivienda', 'comercio'], 
    Meses: [36, 37], 
    selladoVivienda: 0.60, // %
    selladoComercio: 1.0, // %
    precioCopias: 3.20, // c/u
    Honorarios: 0.05, // Alquiler x 36/37meses
    IVA: 0.21, // %
    precioAveriguaciones: 2000, // 
    seguroMenor: 850, // si el Inmueble es menor a 100mts
    seguroMayor: 1450, // si el Inmueble es mayor a 100mts
    Seguro: [850, 1450] // si el Inmueble es menor o mayor a 100 mts respectivamente
}
// const INITIAL_CALC_VALUES = {
//     SelladoVivienda: 0.60, // %
//     SelladoComercio: 1.0, // %
//     PrecioCopias: 3.20, // c/u
//     Honorarios: 0.05, // Alquiler x 36/37meses
//     IVA: 0.21, // %
//     PrecioAveriguaciones: 2000, // 
//     SeguroMenor: 850, // si el Inmueble es menor a 100mts
//     SeguroMayor: 1450, // si el Inmueble es mayor a 100mts
// }

type EstudioPlazaProps = {
    estructura?: 'vivienda' | 'comercio',
};

const EstudioPlazaPage = (props: EstudioPlazaProps) => {
    const navigate = useNavigate();
    let {values} = useValuesEP();
    const verifyValues =  Object.values(values).every((value) => value !== '');

    const [initialValuesToCalc, setInitialValuesToCalc] = useState({
        SelladoVivienda: values ? parseInt(values.SelladoVivienda) : 0.60, 
        SelladoComercio: values ? parseFloat(values.SelladoComercio) : 1.0, 
        PrecioCopias: values ? parseFloat(values.PrecioCopias) : 3.20, 
        Honorarios: values ? parseFloat(values.Honorarios) : 0.05, 
        IVA: values ? parseFloat(values.IVA) : 0.21, 
        PrecioAveriguaciones: values ? parseFloat(values.PrecioAveriguaciones) : 2000,  
        SeguroMenor: values ? parseFloat(values.SeguroMenor) : 850, 
        SeguroMayor: values ? parseFloat(values.SeguroMayor) : 1450, 
    });

    useEffect(()=> {
        if (verifyValues === true) {
            setInitialValuesToCalc({
                SelladoVivienda: values ? parseFloat(values.SelladoVivienda) : 0.60, 
                SelladoComercio: values ? parseFloat(values.SelladoComercio) : 1.0, 
                PrecioCopias: values ? parseFloat(values.PrecioCopias) : 3.20, 
                Honorarios: values ? parseFloat(values.Honorarios) : 0.05, 
                IVA: values ? parseFloat(values.IVA) : 0.21, 
                PrecioAveriguaciones: values ? parseFloat(values.PrecioAveriguaciones) : 2000,  
                SeguroMenor: values ? parseFloat(values.SeguroMenor) : 850, 
                SeguroMayor: values ? parseFloat(values.SeguroMayor) : 1450, 
            })
        }
    }, [verifyValues === true]);

    const [Inmueble, setInmueble] = useState('');
    const [Meses, setMeses] = useState('');
    const [Sellado, setSellado] = useState('');
    const [Honorarios, setHonorarios] = useState({iva: '', honorariosTotal: ''});
    const [totalSinReserva, setTotalSinReserva] = useState('');
    const [totalConReserva, setTotalConReserva] = useState('');
    const [Total, setTotal] = useState('');

    const [bonificacion, setBonificacion] = useState({
        Total: '',
        Reserva: '',
        FechaDeFirmado: 0,
        DiasDelMes: 0,
        CantidadDeDiasNoOcupados: 0,
        CantidadDeDiasOcupados: 0,
        AlquilerPorDia: '',
        DiasCobrados: '',
        DiasBonificados: ''
    })

    const finalData = {
        Inmueble: '', // vivienda o comercio
        Alquiler: '', // $$
        Meses: 0, // 36/37...
        Sellado: '', // $$
        PrecioTotalCopias: '', // $$
        Honorarios: '',// $$
        IVA: '',
        Averiguaciones: '',
        Seguro: '',
    }
    const [finalValues, setFinalValues] = useState(finalData)

    const handleChange = (e: any)=> {
        e.preventDefault();
        const formatedValue = numberSeparation(e.target.value);
        setFinalValues({... finalValues, Alquiler: formatedValue});
    };

    const onSelectInmuebleChange = (e: any) => {
        setInmueble(e?.target?.value);
        setFinalValues({... finalValues, Inmueble: e?.target?.value})
    };
    const onSelectMesesChange = (e: any) => {
        setMeses(e?.target?.value);
        setFinalValues({... finalValues, Meses: e?.target?.value})
    };
    const handleChangeCopias = (e: any)=> {
        e.preventDefault();
        const valorCopias = e.target.value * initialValuesToCalc.PrecioCopias;
        const formatedValue = numberSeparation(valorCopias);
        setFinalValues({... finalValues, PrecioTotalCopias: formatedValue});
    };

    const handleChangeInformes = (e: any)=> {
        e.preventDefault();
        const valorInformes = e.target.value * initialValuesToCalc.PrecioAveriguaciones;
        const formatedValue = numberSeparation(valorInformes);
        setFinalValues({... finalValues, Averiguaciones: formatedValue});
    };

    const handleChangeSeguro = (e: any)=> {
        e.preventDefault();
        const Seguro = (e.target.value > 100) ? initialValuesToCalc.SeguroMayor : initialValuesToCalc.SeguroMenor;
        const formatedValue = numberSeparation(Seguro);
        setFinalValues({... finalValues, Seguro: formatedValue});
    };

    const handleChangeReserva = (e: any)=> {
        e.preventDefault();
        const formatedValue = numberSeparation(e.target.value);
        setBonificacion({... bonificacion, Reserva: formatedValue});
    };

    const handleChangeDate = (e: any)=> {
        e.preventDefault();
        if (finalValues.Alquiler !== '' ) {
            const daySelected = new Date(`${e.target.value}T00:00:00`).getDate()
            const date: Date = new Date;
            const month = date.getMonth();
            const year = date.getFullYear();
            const daysInMonth = new Date( year, month + 1, 0 ).getDate();
            const AlquilerPorDia = finalValues.Alquiler ? reverseNumberSeparation(finalValues.Alquiler) / daysInMonth : 0
            AlquilerPorDia.toPrecision(3);
            const noSeLeCobra = AlquilerPorDia * daySelected;
            setBonificacion({
                ... bonificacion,
                FechaDeFirmado: e.target.value,
                DiasDelMes: daysInMonth,
                AlquilerPorDia: numberSeparation(AlquilerPorDia),
                CantidadDeDiasNoOcupados: daySelected - 1,
                CantidadDeDiasOcupados: daysInMonth - daySelected + 1,
                DiasCobrados: numberSeparation( AlquilerPorDia * (daysInMonth - daySelected + 1)),
                DiasBonificados: numberSeparation(AlquilerPorDia *  daySelected),
                Total: numberSeparation(reverseNumberSeparation(bonificacion.Reserva) - noSeLeCobra)
            })
        }
    };

    const convertir = (element: string) => {
        const value = parseInt(element.replace(/\./g, ''));
        return value;
    };
    useEffect(()=> {
        const selladoInmueble = finalValues.Inmueble === 'vivienda' ? 0.006 : 0.009;
        if (finalValues.Meses !== 0) {
             // op Sellado y Honorarios
            let convertAlquiler=  (finalValues.Alquiler !== '') ? convertir(finalValues.Alquiler) : 0;
            let alquilerXmeses = convertAlquiler * finalValues.Meses;
            let alquilerXmesesHonorarios = alquilerXmeses * initialValuesToCalc.Honorarios;
            let ivaalquilerXmesesHonorarios = alquilerXmesesHonorarios * initialValuesToCalc.IVA;
            if (convertAlquiler !== 0) {
                let honorariosCalculo =  alquilerXmesesHonorarios + ivaalquilerXmesesHonorarios;
                let selladoCalculo = convertAlquiler * finalValues.Meses * selladoInmueble;
                setSellado(numberSeparation(selladoCalculo));
                setHonorarios({iva: numberSeparation(ivaalquilerXmesesHonorarios), honorariosTotal: numberSeparation(honorariosCalculo)});
            };
        }
        

    }, [finalValues])

    const TotalCalc = () => {
        let totalSinReservaObj = {... finalValues, Sellado: Sellado, Honorarios: Honorarios.honorariosTotal, IVA: Honorarios.iva};
        let totalConReservaObj= {... bonificacion}
        const verifyDataSinReserva =  Object.values(totalSinReservaObj).every((value) => value !== 0 && value !== '');
        const verifyDataConReserva =  Object.values(totalConReservaObj).every((value) => value !== 0 && value !== '');
        if (verifyDataSinReserva && verifyDataConReserva ){
            let totalCalcSinReserva;
            let totalCalcConReserva;
            setFinalValues(totalSinReservaObj);
            if ((Sellado && Honorarios) !== '') {
                if (verifyDataSinReserva) {
                    totalCalcSinReserva = convertir(totalSinReservaObj.Alquiler) + convertir(totalSinReservaObj.Averiguaciones) 
                        + convertir(totalSinReservaObj.Honorarios) + convertir(totalSinReservaObj.Seguro) + convertir(totalSinReservaObj.PrecioTotalCopias) + convertir(totalSinReservaObj.Sellado);
                        totalCalcSinReserva = numberSeparation(totalCalcSinReserva);
                    setTotalSinReserva(totalCalcSinReserva);
                } 
            }
            if ((Sellado && Honorarios && totalSinReservaObj.Alquiler && totalConReservaObj.Reserva) !== '') {
                if (verifyDataConReserva) {
                    totalCalcConReserva = convertir(totalConReservaObj.Reserva) - convertir(totalConReservaObj.DiasBonificados)
                    totalCalcConReserva = numberSeparation(totalCalcConReserva);
                    setTotalConReserva(totalCalcConReserva);
                } 
            }
            const sinReserva = reverseNumberSeparation(totalCalcSinReserva as string);
            const conReserva = reverseNumberSeparation(totalCalcConReserva as string);
            const result = sinReserva - conReserva;
            setTotal(numberSeparation(result));
        }
    };

    return (
    <BoxView large='100vh' style={{backgroundColor: 'lightblue', backgroundImage:` linear-gradient(to right, ${PaletColor.one} 0%, #b2ccd4 46%)`, justifyContent: 'unset', padding: '4% 0'}}>
        <StyledWarnigP>{ (values === undefined) ? 'LOS DATOS PUEDEN ESTAR DESACTUALIZADOS: No hay conexion a internet o ocurrio un error al obtener los datos de la base de datos'  : '' }</StyledWarnigP>
        <BoxStyled large='auto' wide='auto'>
            <form style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <CustomDivForm style={{display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                    <select onChange={onSelectInmuebleChange} value={Inmueble} placeholder='Seleccione Inmueble'>
                        <option value={''} disabled hidden> Seleccione Inmueble </option>
                        {INITIAL_VALUES.Inmueble.map((x, y)=> <option key={y} value={x}>{x}</option>)}
                    </select>
                    <div style={{height: '40px', display: 'flex', width: '340px', placeItems: 'center', whiteSpace: 'nowrap', justifyContent: 'center'}}>
                        <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChange} placeholder='Monto' />
                        {(finalValues.Alquiler && finalValues.Alquiler !== '0')  &&  <p>{' 80% ==> ' +  numberSeparation(parseFloat((reverseNumberSeparation(finalValues.Alquiler) * 0.8).toFixed(2))) + '$'}</p> }
                
                    </div>
                    <select onChange={onSelectMesesChange} value={Meses} placeholder='Seleccione Meses'>
                        <option value={''} disabled hidden> Seleccione Meses </option>
                        {INITIAL_VALUES.Meses.map((x, y)=> <option key={y} value={x}>{x}</option>)}
                    </select>
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeCopias} placeholder='Cantidad de copias' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeInformes} placeholder='Cantidad de informes' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSeguro} placeholder='Metros del Inmueble' /> 
                </CustomDivForm>
                <CustomDivForm style={{display: 'flex', flexDirection: 'column', width: '200px', placeItems: 'center'}}> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeReserva} placeholder='Reserva' /> 
                    <CustomInput type='date' variant='InputEstudioPlaza' onChange={handleChangeDate} placeholder='Reserva' /> 
                </CustomDivForm>
            </form>
            <div style={{display: 'flex', flexDirection: 'row', placeItems: 'center'}}>
                <StyleButtonEP onClick={()=> TotalCalc()} > Calcular </StyleButtonEP>
                <StyleButtonEP onClick={()=> navigate('/practice/estudio-plaza/base-de-datos')}> Base de Datos</StyleButtonEP>
            </div>

            {Total !== '' && <Prices>{Total + '$'}</Prices> }
        </BoxStyled>
        <BoxStyledBottom large='400px' style={{display: 'flex', flexDirection: 'row', minHeight: '400px'}}>
            <CustomDiv> 
                {ObtenerValor(finalValues, '', 'no se ingreso')}
            </CustomDiv>
            <CustomDiv> 
                {ObtenerValor(bonificacion, '', 'no se ingreso')};
            </CustomDiv>
        </BoxStyledBottom>
    </BoxView>
    )
};

export default EstudioPlazaPage;

export const CustomDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    max-width: 400px;
    height: 340px;
    margin: 0 8px;
    place-items: center;
    border-radius: 4px;
    box-shadow: 0px 2px 4px 4px #aeaebd;
    justify-content: center;
    p {
        display: flex;
        place-items: center;
        margin: 2px;
    }
`
export const CustomDivForm = styled(CustomDiv)`
    height: 280px;
    width: 200px;
    max-width: 300px;
    display: 'flex';
    flex-direction: 'column';
    place-items: 'center';
    input {
        margin: 6px 0;
    }
    select {
        margin: 10px 0;
    }
`
export const BoxStyled = styled(BoxView)`
    background-color: azure;
    border-radius: 4px;
    box-shadow: -2px 2px 18px 6px #4c4c74;
    padding: 2% 0%;
    width: 90%;
    max-width: 740px;
    min-width: 510px;
    min-height: 320px;
`
const BoxStyledBottom = styled(BoxView)`
    display: flex;
    flex-direction: row;
    background-color: aliceblue;
    width: 90%;
    min-width: 500px;
    min-height: 400px;
    max-width: 740px;
    margin: 2% 0;
    border-radius: 4px;
    box-shadow: -2px 2px 18px 6px #4c4c74;
`
export const Prices = styled.p`
    font-size: 18px;
    background-color: beige;
    margin: 4px;
`

export const StyleButtonEP = styled.button`
    background-color: #4388ff;
    height: 40px;
    width: 200px;
    font-size: 24px;
    border-radius: 10px;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #a2bbe6;
    }
`
const StyledWarnigP = styled.p`
    background-color: yellow;
    font-size: 20px;
    font-weight: bold;
`