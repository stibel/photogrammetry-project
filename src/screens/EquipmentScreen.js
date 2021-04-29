import { useContext, useEffect, useRef, useState, useReducer } from "react";
import firebase from "../firebase";
import Loading from "react-loading";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StyleContext } from "../styles/StyleContext";
import Input from "../styles/Input";
import Button from "../styles/Button";
import Toast from "../services/SignalService";
import { ACTIONS } from "../globals/ACTIONS";
import { FieldParametersService } from "../services/FieldParametersService";

const inputLabelStyle = {
    marginRight: '4%',
    width: '7.5vw',
    textAlign: 'center',
    cursor: 'help'
}

const ansLabelStyle = {
    width: '6vw',
    textAlign: 'center',
    cursor: 'help'
}


const EquipmentScreen = props => {
    const theme = useContext(StyleContext);

    function reducer(state, action) {
        switch (action.type) {
            case 'set':
                return {
                    ...FieldParametersService.getBase(GSD.current.value, selectedCamera, p.current.value, q.current.value, Dx.current.value, Dy.current.value)
                }
            case 'correct':
                return {
                    ...state, ...FieldParametersService.correctBase(state.Nx, state.Ny, Dx.current.value, Dy.current.value)
                }
            case 'intervals':
                return {
                    ...state, ...FieldParametersService.getInterval(state.Bx, selectedPlane, selectedCamera)
                }
            default:
                return state
        }
    }

    const [planes, setPlanes] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const GSD = useRef(null);
    const avgHeight = useRef(null);
    const p = useRef(null);
    const q = useRef(null);
    const Dx = useRef(null);
    const Dy = useRef(null);
    const [state, dispatch] = useReducer(reducer, null);

    const ansStyle = {
        width: '7vw',
        height: '2vh',
        border: `2px solid ${theme.colours.stripes}`,
        fontSize: `${theme.fonts.size.s}`,
        backgroundColor: theme.colours.sky,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const validateInput = (input, lowerBound, upperBound) => {

        if (isNaN(input) || input === "")
            return false;

        const value = parseInt(input)

        if (lowerBound)
            if (value < lowerBound)
                return false

        if (upperBound)
            if (value > upperBound)
                return false

        return true;
    }

    const getBase = () => {
        //a bit messy for now
        Dx.current.value = Dx.current.value.replace(',', '.');
        Dy.current.value = Dy.current.value.replace(',', '.');
        if (!validateInput(GSD.current.value, 0) || !validateInput(avgHeight.current.value, 0) ||
            !validateInput(p.current.value, 0, 100) || !validateInput(q.current.value, 0, 100)
            || !validateInput(Dx.current.value) || !validateInput(Dy.current.value)
        ) {
            Toast("Wprowadź poprawne wartości! Pamiętaj, żeby użyć kropki jako separatora dziesiętnego.", 'e');
            return
        }
        dispatch({ type: ACTIONS.SET });
        // setParameters(FieldParametersService.getBase(GSD.current.value, selectedCamera, p.current.value, q.current.value, Dx.current.value, Dy.current.value));
    }

    const correctBase = () => {
        if(!state || !validateInput(Dx.current.value) || !validateInput(Dy.current.value)) {
            Toast('Wprowadź prawidłowe wartości!', 'w');
            return
        }
        dispatch({ type: ACTIONS.CORRECT })
    }

    const getInterval = () => {
        if(!state) {
            Toast('Wprowadź prawidłowe wartości!', 'w');
            return
        }
        dispatch({ type: ACTIONS.INTERVALS })
    }

    useEffect(() => {
        if (state)
            {
                document.getElementById('height').innerText = FieldParametersService.getFlightHeight(GSD.current.value, selectedCamera, parseFloat(avgHeight.current.value));
                document.getElementById('Lx').innerText = state.Lx.toString();
                document.getElementById('Ly').innerText = state.Ly.toString();
                document.getElementById('Bx').innerText = state.Bx.toString();
                document.getElementById('By').innerText = state.By.toString();
                document.getElementById('Nx').innerText = state.Nx.toString();
                document.getElementById('Ny').innerText = state.Ny.toString();
            }
        console.log(state);
        // eslint-disable-next-line
    }, [state])

    // useEffect(() => {
    //     console.log(selectedPlane, selectedCamera)
    // }, [selectedPlane, selectedCamera])
    //
    useEffect(() => {
        console.log(state)
    }, [state])

    useEffect(() => {
        const planesRef = firebase.firestore().collection("planes");
        const camerasRef = firebase.firestore().collection("cameras");
        function getItems() {
            setLoading(true);
            planesRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({value: doc.data(), label: doc.data().fullName});
                });
                setPlanes(items);
                setSelectedPlane(items[0].value)
            })
            camerasRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({value: doc.data(), label: doc.data().fullName});
                });
                setCameras(items);
                setSelectedCamera(items[0].value);
                setLoading(false);
            })
        }
        getItems();
    }, []);

    const customStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: theme.colours.sky,
            height: '5vh',
            width: '15vw',
            fontSize: theme.fonts.size.s,
            border: `solid 3px ${theme.colours.stripes}`
        }),

        dropdownIndicator: styles => ({
            ...styles,
            color: theme.colours.stripes
        }),

        menuList: styles => ({
            ...styles,
            backgroundColor: theme.colours.sky,
            border: `solid 3px ${theme.colours.stripes}`,
            borderRadius: '1%',
            boxShadow: `0 0 25px ${theme.colours.sky}`
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? theme.colours.steel : theme.colours.sky,
            color: theme.colours.stripes,
            textDecoration: state.isSelected ? 'underline' : 'none',
            cursor: 'pointer'
        }),

        singleValue: styles => ({
            ...styles,
            color: theme.colours.stripes
        })
    }

    if (loading) {
        return (
            <div style={{
                ...theme.layout,
                backgroundColor: theme.colours.steel,
                height: '90vh',
                width: '100vw',
                fontFamily: theme.fonts.family,
                color: theme.colours.stripes,
                justifyContent: 'center',
            }}>
                <Loading color={theme.colours.stripes} />
            </div>
        );
    }

    return (
        <div>
            <div style={{
                ...theme.layout,
                backgroundColor: theme.colours.steel,
                minHeight: '90vh',
                maxWidth: '100vw',
                fontFamily: theme.fonts.family,
                color: theme.colours.stripes
            }}>
                <div style={{
                    ...theme.layout,
                    flexFlow: 'column',
                    justifyContent: 'space-evenly',
                    width: '50%'
                }}>
                    <h1>Wybierz sprzęt</h1>
                    <h2>Samoloty</h2>
                    <Select
                        styles={customStyles}
                        defaultValue={planes[0]}
                        options={planes}
                        onChange={item => setSelectedPlane(item.value)}
                    />
                    <h2>Kamery</h2>
                    <Select
                        styles={customStyles}
                        defaultValue={cameras[0]}
                        options={cameras}
                        onChange={item => setSelectedCamera(item.value)}
                    />
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Terenowy rozmiar piksela" } style={inputLabelStyle}>GSD&nbsp;[cm]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={GSD} />
                    </div>
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Średnia wysokość terenu" } style={inputLabelStyle}>h&nbsp;[m]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={avgHeight} />
                    </div>
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Pokrycie podłużne" } style={inputLabelStyle}>p&nbsp;[%]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={p} />
                    </div>
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Pokrycie poprzeczne" } style={inputLabelStyle}>q&nbsp;[%]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={q} />
                    </div>
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Zasięg obszaru opracowania wzdłuż kierunku lotu" } style={inputLabelStyle}>D<sub>x</sub>&nbsp;[km]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={Dx} />
                    </div>
                    <div style={{ ...theme.layout }}>
                        <h2 title={ "Zasięg obszaru opracowania w poprzek kierunku lotu" } style={inputLabelStyle}>D<sub>y</sub>&nbsp;[km]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={Dy} />
                    </div>
                    <Button onClick={getBase}>Oblicz</Button>
                </div>
                <div style={{
                    ...theme.layout,
                    flexFlow: 'column',
                    height: '100%',
                    width: '50%',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        ...theme.layout,
                        flexFlow: 'column',
                        justifyContent: 'space-evenly',
                        width: '30%',
                        // height: '30%',
                        border: `solid 3px ${theme.colours.stripes}`,
                        borderRadius: '5%',
                        backgroundColor: theme.colours.sky,
                        padding: '5%'
                    }}>
                        <div style={{...theme.layout, height: '4vh'}}>
                           <div style={{...ansLabelStyle, cursor: 'default'}}>Wysokość&nbsp;[m]:</div> <div style={ansStyle} id={'height'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div title={"Wymiar terenowy bazy podłużnej"} style={ansLabelStyle}>B<sub>x</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Bx'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div title={"Wymiar terenowy bazy poprzecznej"} style={ansLabelStyle}>B<sub>y</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'By'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div  title={"Terenowy zasięg zdjęcia wzdłuż kierunku lotu"}  style={ansLabelStyle}>L<sub>x</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Lx'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div title={"Terenowy zasięg zdjęcia w poprzek kierunku lotu"} style={ansLabelStyle}>L<sub>y</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Ly'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div title={"Liczba zdjęć w pojedynczym szeregu"} style={ansLabelStyle}>N<sub>x</sub>:</div> <div style={ansStyle} id={'Nx'}/>
                        </div>
                        <div style={{...theme.layout, height: '4vh'}}>
                            <div title={"Liczba szeregów"} style={ansLabelStyle}>N<sub>y</sub>:</div> <div style={ansStyle} id={'Ny'}/>
                        </div>
                    </div>
                    <Button onClick={correctBase}> Dokonaj korekcji bazy </Button>
                    <Button title={
                        "Znając ostateczne parametry lotu należy jeszcze skontrolować, czy interwał czasu pomiędzy ekspozycjami nie jest mniejszy od cyklu pracy kamery"}
                            onClick={getInterval}> Kontrola interwału </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EquipmentScreen;
