import { Outlet, useNavigate, useLocation, useInRouterContext } from "react-router-dom";
import View from "../../components/View";
import { BoxView } from "../../components/View/BoxViews";
import StyledButton from "../../components/button";
import { useState } from "react";




const Practice = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const [buttonActive, isButtonActive] = useState();



    return (
        <View positionx="center" positiony="start" >
          <BoxView large="100vh" wide="600px" style={{margin: '0 2%', flexDirection: 'column'}}>
                <StyledButton onClick={() => navigate('/home')}>
                    Go home
                </StyledButton>
                <h4 style={{}}>An overall look at of all practice that I did in my entire programming career.</h4>

                <StyledButton active={(location === '/practice/routes-practice').toString()} onClick={() => navigate('/practice/routes-practice')}>
                    Routes
                </StyledButton>
                <StyledButton active={(location ===  '/practice/type').toString()} onClick={() => navigate('/practice/type')}>
                    Types
                </StyledButton>
                <StyledButton active={(location ===  '/practice/giphy-page').toString()} onClick={() => navigate('/practice/giphy-page')}>
                    Giphy
                </StyledButton>
                <StyledButton active={(location ===  '/practice/estudio-plaza').toString()} onClick={() => navigate('/practice/estudio-plaza')}>
                    Estudio Plaza
                </StyledButton>
                <StyledButton  active={(location ===  '').toString()} onClick={() => navigate('/practice')}>
                    Abstraccion
                </StyledButton>
                <StyledButton  active={(location ===  '').toString()} onClick={() => navigate('/practice')}>
                Implementation
                </StyledButton>
                <StyledButton  active={(location ===  '').toString()} onClick={() => navigate('/practice')}>
                    Hooks
                </StyledButton>
                {/* <li>Hooks</li> 
                <li>Use DB</li>
                <li>JavaScript</li>
                <li>Stores</li> */}
            </BoxView>
            {/* <BoxView wide="600px"> */}
            <BoxView wide="80%" style={{maxHeight: '100vh'}}>
                <Outlet />
            </BoxView>
            {/* </BoxView> */}
        </View>
    )
}

export default Practice;