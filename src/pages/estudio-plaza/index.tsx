import React, {useEffect, useState} from 'react';
import { BoxView } from '../../components/View/BoxViews';
import { CustomInput } from '../../components/input';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import styled from 'styled-components';
import { PaletColor } from '../../components/View/style';

const INITIAL_VALUES = {
    inmueble: ['vivienda', 'comercio'], 
    meses: [36, 37], 
    selladoVivienda: 0.60, // %
    selladoComercio: 1.0, // %
    precioCopias: 3.20, // c/u
    honorarios: 0.05, // alquiler x 36/37meses
    ivaHonorarios: 0.21, // %
    precioAveriguaciones: 2000, // 
    seguroMenor: 850, // si el inmueble es menor a 100mts
    seguroMayor: 1450, // si el inmueble es mayor a 100mts
    seguro: [850, 1450] // si el inmueble es menor o mayor a 100 mts respectivamente
}


type EstudioPlazaProps = {
    estructura?: 'vivienda' | 'comercio',
    
};

const EstudioPlazaPage = (props: EstudioPlazaProps) => {
    const [inmueble, setInmueble] = useState('');
    const [meses, setMeses] = useState('');
    const [sellado, setSellado] = useState('');
    const [honorarios, setHonorarios] = useState({iva: '', honorariosTotal: ''});
    const [totalSinReserva, setTotalSinReserva] = useState('');
    const [totalConReserva, setTotalConReserva] = useState('');
    const [total, setTotal] = useState('');

    const [bonificacion, setBonificacion] = useState({
        total: '',
        reserva: '',
        fechaDeFirma: 0,
        diasDelMes: 0,
        diasQueNoOcupa: 0,
        diasQueSiOcupa: 0,
        alquilerXdia: '',
        seLeCobra: '',
        noSeLeCobra: ''
    })

    const finalData = {
        inmueble: '', // vivienda o comercio
        alquiler: '', // $$
        // porcentajeSellado: '', // 0.60...
        meses: 0, // 36/37...
        sellado: '', // $$
        totalCopias: '', // $$
        // precioXCopia: '', // $$
        // cantCopias: 0, // 1,2,3,5...
        honorarios: '',// $$
        ivaHonorarios: '',
        // iva: 0, // $$
        averiguaciones: '',
        seguro: '',
    }
    const [finalValues, setFinalValues] = useState(finalData)

    // firebase
    const [valuesDB, setValuesDB] = useState([]);
    useEffect(()=> {
        const getValuesFromDB = async () =>{

        }
    }, [])
    // const valuesList = collection(db, "values");

    // // const firestore = firebase.firestore();
    // const dbValues = firestore.collection('values');
    // const query = dbValues.orderBy('createdAt').limit(4);
    // const docRefValues = addDoc(collection(db, "values"), {
    //     IVA: '21'
    // });

    const addToDB = () => {
        console.log('sdfgsasadgf')
        try {
             addDoc(collection(db, "values"), {
                IVA: '21'
            });
        } catch (err) {
            console.log(err)
        }
    };

    const numberSeparation = (arr: number) => {
        const formateador = new Intl.NumberFormat('es-ES');
        
        return formateador.format(arr);
    };
    const reverseNumberSeparation = (str: string) => {
        // Elimina el separador de miles y convierte la cadena en un número
        const numberWithoutSeparator = parseFloat(str.replace(/[,\.]/g, ''));
        return numberWithoutSeparator;
    }

    const handleChange = (e: any)=> {
        e.preventDefault();
        const formatedValue = numberSeparation(e.target.value);
        setFinalValues({... finalValues, alquiler: formatedValue});
    };

    const onSelectInmuebleChange = (e: any) => {
        setInmueble(e?.target?.value);
        setFinalValues({... finalValues, inmueble: e?.target?.value})
    };
    const onSelectMesesChange = (e: any) => {
        setMeses(e?.target?.value);
        setFinalValues({... finalValues, meses: e?.target?.value})
    };
    const handleChangeCopias = (e: any)=> {
        e.preventDefault();
        const valorCopias = e.target.value * INITIAL_VALUES.precioCopias;
        const formatedValue = numberSeparation(valorCopias);
        setFinalValues({... finalValues, totalCopias: formatedValue});
    };

    const handleChangeInformes = (e: any)=> {
        e.preventDefault();
        const valorInformes = e.target.value * INITIAL_VALUES.precioAveriguaciones;
        const formatedValue = numberSeparation(valorInformes);
        setFinalValues({... finalValues, averiguaciones: formatedValue});
    };

    const handleChangeSeguro = (e: any)=> {
        e.preventDefault();
        const seguro = (e.target.value > 100) ? INITIAL_VALUES.seguroMayor : INITIAL_VALUES.seguroMenor;
        const formatedValue = numberSeparation(seguro);
        setFinalValues({... finalValues, seguro: formatedValue});
    };

    const handleChangeReserva = (e: any)=> {
        e.preventDefault();
        const formatedValue = numberSeparation(e.target.value);
        setBonificacion({... bonificacion, reserva: formatedValue});
    };

    const handleChangeDate = (e: any)=> {
        e.preventDefault();
        const daySelected = new Date(`${e.target.value}T00:00:00`).getDate()
        const date: Date = new Date;
        const month = date.getMonth();
        const year = date.getFullYear();
        const daysInMonth = new Date( year, month + 1, 0 ).getDate();
        const alquilerXdia = finalValues.alquiler ? reverseNumberSeparation(finalValues.alquiler) / daysInMonth : 0
        alquilerXdia.toPrecision(3);
        const noSeLeCobra = alquilerXdia * daySelected;
        setBonificacion({
            ... bonificacion,
            fechaDeFirma: e.target.value,
            diasDelMes: daysInMonth,
            alquilerXdia: numberSeparation(alquilerXdia),
            diasQueNoOcupa: daySelected - 1,
            diasQueSiOcupa: daysInMonth - daySelected + 1,
            seLeCobra: numberSeparation( alquilerXdia * (daysInMonth - daySelected + 1)),
            noSeLeCobra: numberSeparation(alquilerXdia *  daySelected),
            total: numberSeparation(reverseNumberSeparation(bonificacion.reserva) - noSeLeCobra)
        })
    };

    const convertir = (element: string) => {
        const value = parseInt(element.replace(/\./g, ''));
        return value;
    };
    useEffect(()=> {
        const selladoInmueble = finalValues.inmueble === 'vivienda' ? 0.006 : 0.009;
        if (finalValues.meses !== 0) {
             // op sellado y honorarios
            let convertAlquiler=  (finalValues.alquiler !== '') ? convertir(finalValues.alquiler) : 0;
            let alquilerXmeses = convertAlquiler * finalValues.meses;
            let alquilerXmesesHonorarios = alquilerXmeses * INITIAL_VALUES.honorarios;
            let ivaalquilerXmesesHonorarios = alquilerXmesesHonorarios * INITIAL_VALUES.ivaHonorarios;
            if (convertAlquiler !== 0) {
                let honorariosCalculo =  alquilerXmesesHonorarios + ivaalquilerXmesesHonorarios;
                let selladoCalculo = convertAlquiler * finalValues.meses * selladoInmueble;
                setSellado(numberSeparation(selladoCalculo));
                setHonorarios({iva: numberSeparation(ivaalquilerXmesesHonorarios), honorariosTotal: numberSeparation(honorariosCalculo)});
            };
        }
        

    }, [finalValues])

    const TotalCalc = () => {
        let totalSinReservaObj = {... finalValues, sellado: sellado, honorarios: honorarios.honorariosTotal, ivaHonorarios: honorarios.iva};
        let totalConReservaObj= {... bonificacion}
        const verifyDataSinReserva =  Object.values(totalSinReservaObj).every((value) => value !== 0 && value !== '');
        const verifyDataConReserva =  Object.values(totalConReservaObj).every((value) => value !== '');

        let totalCalcSinReserva;
        let totalCalcConReserva;
        setFinalValues(totalSinReservaObj);
        if ((sellado && honorarios) !== '') {
            // const verifyyData =  Object.values(totalSinReservaObj).every((value) => value !== 0 && value !== '');
            if (verifyDataSinReserva) {
                totalCalcSinReserva = convertir(totalSinReservaObj.alquiler) + convertir(totalSinReservaObj.averiguaciones) 
                    + convertir(totalSinReservaObj.honorarios) + convertir(totalSinReservaObj.seguro) + convertir(totalSinReservaObj.totalCopias) + convertir(totalSinReservaObj.sellado);
                    totalCalcSinReserva = numberSeparation(totalCalcSinReserva);
                setTotalSinReserva(totalCalcSinReserva);
            } 
        }
        if ((sellado && honorarios && totalSinReservaObj.alquiler && totalConReservaObj.reserva) !== '') {
            // const verifyyData =  Object.values(totalConReserva).every((value) => value !== '');
            if (verifyDataConReserva) {
                totalCalcConReserva = convertir(totalConReservaObj.reserva) - convertir(totalConReservaObj.noSeLeCobra)
                totalCalcConReserva = numberSeparation(totalCalcConReserva);
                setTotalConReserva(totalCalcConReserva);
            } 
        }
        if (verifyDataSinReserva && verifyDataConReserva ){
            const sinReserva = reverseNumberSeparation(totalCalcSinReserva as string);
            const conReserva = reverseNumberSeparation(totalCalcConReserva as string);
            const result = sinReserva - conReserva;
            setTotal(numberSeparation(result));
        }
    };


    return (
    <BoxView large='100vh' style={{backgroundColor: 'lightblue', backgroundImage:` linear-gradient(to right, ${PaletColor.one} 0%, #b2ccd4 46%)`}}>
        {/* <p>Programa para estudio plaza</p> */}
        {/* <h4>db</h4>
        <button onClick={()=> addToDB()}> add to db</button>
        <ul>
            Los valores actuales son: 
            <li>
                IVA: {IVA}
            </li>
            <li>
                Porcentaje para viviendas: {viviendaPercent}
            </li>
            <li>
                Porcentaje para comercios: {comercioPercent}
            </li>
        </ul> */}
        
        {/* <form onSubmit={handleSubmit}> */}
            {/* <CustomInput variant='InputForm'  onChange={() => {}}  /> */}
            {/* <button>ingresar</button>
        </form> */}
        {/* <button onClick={()=> setValue(INITIAL_STATE)}> Resetear</button> */}
        <BoxStyled large='auto' wide='90%'>
            <form style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <CustomDivForm style={{display: 'flex', flexDirection: 'column', width: '300px', placeItems: 'center'}}>
                    <select onChange={onSelectInmuebleChange} value={inmueble} placeholder='Seleccione inmueble'>
                        <option value={''} disabled hidden> Seleccione inmueble </option>
                        {INITIAL_VALUES.inmueble.map((x, y)=> <option key={y} value={x}>{x}</option>)}
                    </select>
                    <div style={{height: '40px', display: 'flex', width: '340px', placeItems: 'center', whiteSpace: 'nowrap', justifyContent: 'center'}}>
                        <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChange} placeholder='Monto' />
                        {(finalValues.alquiler && finalValues.alquiler !== '0')  &&  <p>{' 80% ==> ' +  numberSeparation(parseFloat((reverseNumberSeparation(finalValues.alquiler) * 0.8).toFixed(2))) + '$'}</p> }
                
                    </div>
                    <select onChange={onSelectMesesChange} value={meses} placeholder='Seleccione meses'>
                        <option value={''} disabled hidden> Seleccione meses </option>
                        {INITIAL_VALUES.meses.map((x, y)=> <option key={y} value={x}>{x}</option>)}
                    </select>
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeCopias} placeholder='Cantidad de copias' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeInformes} placeholder='Cantidad de informes' /> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeSeguro} placeholder='Metros del inmueble' /> 
                </CustomDivForm>
                <CustomDivForm style={{display: 'flex', flexDirection: 'column', width: '300px', placeItems: 'center'}}> 
                    <CustomInput type='number' variant='InputEstudioPlaza' onChange={handleChangeReserva} placeholder='Reserva' /> 
                    <CustomInput type='date' variant='InputEstudioPlaza' onChange={handleChangeDate} placeholder='Reserva' /> 
                </CustomDivForm>
            </form>
            <StyleButtonEP onClick={()=> TotalCalc()} style={{margin: '20px 0 0 0'}}> Calcular </StyleButtonEP>
            {total !== '' && <Prices>{total + '$'}</Prices> }
        </BoxStyled>
        <BoxStyledBottom large='360px' style={{display: 'flex', flexDirection: 'row', minWidth: '600px'}}>
            <CustomDiv> 
                <p>Inmueble == {finalValues.inmueble ? <Prices>{finalValues.inmueble}</Prices>  : 'no se ingreso'}</p>
                <p>Valor del alquiler == {finalValues.alquiler ? <Prices>{finalValues.alquiler + '$'}</Prices> : 'no se ingreso'}</p>
                <p>Meses == {finalValues.meses ? <Prices>{finalValues.meses}</Prices> : 'no se ingreso'}</p>
                <p>Sellado == {sellado ? <Prices>{sellado + '$'}</Prices> : 'no se ingreso'}</p>
                <p>Copias == {finalValues.totalCopias ? <Prices>{finalValues.totalCopias + '$'}</Prices>  : 'no se ingreso'}</p>
                <p>Honorarios == {honorarios.honorariosTotal ? <Prices>{honorarios.honorariosTotal + '$'}</Prices>  : 'no se ingreso'}</p>
                <p>IVA de los Honorarios == {honorarios.iva ? <Prices>{honorarios.iva + '$'}</Prices>  : 'no se ingreso'}</p>
                <p>Averiguaciones == {finalValues.averiguaciones ? <Prices>{finalValues.averiguaciones + '$'}</Prices>  : 'no se ingreso'}</p>
                <p>Seguro == {finalValues.seguro ? <Prices>{finalValues.seguro + '$'}</Prices>  : 'no se ingreso'}</p>
                <p>TOTAL SIN Reserva== {totalSinReserva ? <Prices>{totalSinReserva + '$'}</Prices>  : 'no se ingreso'}</p>
            </CustomDiv>
            <CustomDiv> 
                <p>Reserva == {bonificacion.reserva ? <Prices>{bonificacion.reserva + '$'}</Prices> : 'no se ingreso'}</p>
                <p>Fecha de firma == {bonificacion.fechaDeFirma ? <Prices>{bonificacion.fechaDeFirma }</Prices> : 'no se ingreso'}</p>
                <p>Dias del mes == {bonificacion.diasDelMes ? <Prices>{bonificacion.diasDelMes}</Prices> : 'no se ingreso'} </p>
                <p>Dias que no ocupo == {bonificacion.diasQueNoOcupa ? <Prices>{bonificacion.diasQueNoOcupa}</Prices>  : 'no se ingreso'}</p>
                <p>Dias que ocupo == {bonificacion.diasQueSiOcupa ?<Prices>{bonificacion.diasQueSiOcupa }</Prices> : 'no se ingreso'}</p>
                <p>Alquiler por dia == {bonificacion.alquilerXdia ? <Prices>{bonificacion.alquilerXdia + '$'}</Prices> : 'no se ingreso'}</p>
                <p>Dias cobrados == {bonificacion.seLeCobra ? <Prices>{bonificacion.seLeCobra + '$'}</Prices> : 'no se ingreso'}</p>
                <p>Dias bonificados == {bonificacion.noSeLeCobra ? <Prices>{bonificacion.noSeLeCobra + '$'}</Prices> : 'no se ingreso'}</p>
                <p>TOTAL CON Reserva== {totalConReserva ? <Prices>{totalConReserva + '$'}</Prices>  : 'no se ingreso'}</p>
            </CustomDiv>
        </BoxStyledBottom>
    </BoxView>
    )
};

export default EstudioPlazaPage;

const CustomDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
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
const CustomDivForm = styled(CustomDiv)`
    height: 360px;
    input {
        margin: 14px 0;
    }
    select {
        margin: 20px 0;
    }
`
const BoxStyled = styled(BoxView)`
    background-color: azure;
    border-radius: 4px;
    box-shadow: -2px 2px 18px 6px #4c4c74;
    padding: 2% 0%;
`
const BoxStyledBottom = styled(BoxView)`
    display: flex;
    flex-direction: row;
    background-color: aliceblue;
    width: 90%;
    margin: 2% 0;
    border-radius: 4px;
    box-shadow: -2px 2px 18px 6px #4c4c74;
`
const Prices = styled.p`
    font-size: 18px;
    background-color: beige;
    margin: 4px;
`

const StyleButtonEP = styled.button`
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