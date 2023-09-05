import react from 'react';
import View from '../../../components/View';
import { CustomInput } from '../../../components/input';
import { BoxView } from '../../../components/View/BoxViews';

const TypesPractice = () => {

    return(
    <>
        <BoxView>
            <h2>On this page, I will try to practice with types, for example, the generic type.</h2>
        </BoxView>
        <BoxView large='500px' wide='400px'>
            <p>This inputs are made in a type manner. You can view the code at: ...</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <CustomInput variant='InputForm' />
                <CustomInput variant='Input'/>
                <CustomInput variant='InputFocus'/>
                <CustomInput variant='InputFormUser'/>
                <CustomInput variant='Input' customStyle={{height: '20px'}} />
            </div>
        </BoxView>
    </>)
};

export default TypesPractice;

