import { useNavigate } from "react-router-dom";
import View from "../../components/View";
import { BoxView } from "../../components/View/BoxViews";
import StyledButton from "../../components/button";

const Home = () => {
    const navigate = useNavigate();

    return (
        <View>

            <BoxView large="100vh">
                {/* Login? */}
                <p>This is the Home page.</p>

                {/* <li>Go to my trayectory /?</li>  */}
                <StyledButton onClick={() => navigate('/home')}>
                    Go home
                </StyledButton>
                <StyledButton onClick={() => navigate('/projects')}>
                    Go to my proyects
                </StyledButton>
                <StyledButton onClick={() => navigate('/practice')}>
                    Go to practice
                </StyledButton>
            </BoxView>
        </View>
    )
};

export default Home;
