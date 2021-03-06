import { useEffect, useReducer, useRef, useState } from "react";
import Loading from "react-loading";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStyle } from "../contexts/StyleContext";
import firebase from "../firebase";
import { ACTIONS } from "../globals/ACTIONS";
import { FieldParametersService } from "../services/FieldParametersService";
import Button from "../styles/Button";
import Input from "../styles/Input";

const inputLabelStyle = {
    marginRight: '4%',
    width: '7.5vw',
    textAlign: 'center',
    cursor: 'help'
}

const ansLabelStyle = {
    width: '7vw',
    textAlign: 'center',
    cursor: 'help'
}


const EquipmentScreen = props => {
    const { curStyle } = useStyle();

    function reducer(state, action) {
        switch (action.type) {
            case 'set':
                return {
                    ...FieldParametersService.getBase(GSD.current.value, selectedCamera, p.current.value, q.current.value, Dx.current.value, Dy.current.value)
                }
            case 'correct':
                return {
                    ...state,
                    ...FieldParametersService.correctBase(state.Nx, state.Ny, Dx.current.value, Dy.current.value)
                }
            case 'intervals':
                return {
                    ...state,
                    ...FieldParametersService.getInterval(state.Bx, state.Ny, state.photoQuantity, selectedPlane, selectedCamera)
                }
            case 'coefficient': {
                return {
                    ...state,
                    ...FieldParametersService.getCoefficient(state)
                }
            }
            default:
                return state
        }
    }

    const [planes, setPlanes] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const GSD = useRef(null);
    const avgHeight = useRef(null);
    const p = useRef(null);
    const q = useRef(null);
    const Dx = useRef(null);
    const Dy = useRef(null);
    const [curParams, dispatchParams] = useReducer(reducer, null);

    const ansStyle = {
        width: '7vw',
        height: '2vh',
        border: `2px solid ${curStyle.colours.stripes}`,
        fontSize: `${curStyle.fonts.size.s}`,
        backgroundColor: curStyle.colours.sky,
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
            toast.error("Wprowad?? poprawne warto??ci! Pami??taj, ??eby u??y?? kropki jako separatora dziesi??tnego.");
            return
        }
        dispatchParams({ type: ACTIONS.SET });
        // setParameters(FieldParametersService.getBase(GSD.current.value, selectedCamera, p.current.value, q.current.value, Dx.current.value, Dy.current.value));
    }

    const correctBase = () => {
        if (!curParams || !validateInput(Dx.current.value) || !validateInput(Dy.current.value)) {
            toast.warn("Dokonaj wst??pnych oblicze??!");
            return
        }
        dispatchParams({ type: ACTIONS.CORRECT })
    }

    const getInterval = () => {
        if (!curParams) {
            toast.warn("Dokonaj wst??pnych oblicze??!");
            return
        }
        dispatchParams({ type: ACTIONS.INTERVALS })
    }

    const getCoefficient = () => {
        if (!curParams) {
            toast.warn("Dokonaj wst??pnych oblicze??!");
            return
        }
        dispatchParams({ type: ACTIONS.COEFFICIENT })
    }

    useEffect(() => {
        if (curParams) {
            document.getElementById('height').innerText = FieldParametersService.getFlightHeight(GSD.current.value, selectedCamera, parseFloat(avgHeight.current.value));
            document.getElementById('Lx').innerText = curParams.Lx.toString();
            document.getElementById('Ly').innerText = curParams.Ly.toString();
            document.getElementById('Bx').innerText = curParams.Bx.toString();
            document.getElementById('By').innerText = curParams.By.toString();
            document.getElementById('Nx').innerText = curParams.Nx.toString();
            document.getElementById('Ny').innerText = curParams.Ny.toString();
            if (curParams.hasOwnProperty('flightTime'))
                document.getElementById('flightTime').innerText = curParams.flightTime.toString();
            if (curParams.hasOwnProperty('k'))
                document.getElementById('k').innerText = curParams.k.toString();    
        }
        // eslint-disable-next-line
    }, [curParams])


    useEffect(() => {
        console.log(curParams)
    }, [curParams]);

    useEffect(() => {
        const planesRef = firebase.firestore().collection("planes");
        const camerasRef = firebase.firestore().collection("cameras");
        function getItems() {
            planesRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ value: doc.data(), label: doc.data().fullName });
                });
                setPlanes(items);
                setSelectedPlane(items[0].value)
            })
            camerasRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ value: doc.data(), label: doc.data().fullName });
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
            backgroundColor: curStyle.colours.sky,
            height: '5vh',
            width: '15vw',
            fontSize: curStyle.fonts.size.s,
            border: `solid 3px ${curStyle.colours.stripes}`
        }),

        dropdownIndicator: styles => ({
            ...styles,
            color: curStyle.colours.stripes
        }),

        menuList: styles => ({
            ...styles,
            backgroundColor: curStyle.colours.sky,
            border: `solid 3px ${curStyle.colours.stripes}`,
            borderRadius: '1%',
            boxShadow: `0 0 25px ${curStyle.colours.sky}`
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? curStyle.colours.steel : curStyle.colours.sky,
            color: curStyle.colours.stripes,
            textDecoration: state.isSelected ? 'underline' : 'none',
            cursor: 'pointer'
        }),

        singleValue: styles => ({
            ...styles,
            color: curStyle.colours.stripes
        })
    }

    if (loading) {
        return (
            <div style={{
                ...curStyle.layout,
                backgroundColor: curStyle.colours.steel,
                height: '90vh',
                width: '100vw',
                fontFamily: curStyle.fonts.family,
                color: curStyle.colours.stripes,
                justifyContent: 'center',
            }}>
                <Loading color={curStyle.colours.stripes} />
            </div>
        );
    }

    return (
        // <Switch>
        //     <Route exact path={`${path}`}>
        <div>
            <div style={{
                ...curStyle.layout,
                backgroundColor: curStyle.colours.steel,
                minHeight: '90vh',
                maxWidth: '100vw',
                fontFamily: curStyle.fonts.family,
                color: curStyle.colours.stripes
            }}>
                <div style={{
                    ...curStyle.layout,
                    flexFlow: 'column',
                    justifyContent: 'space-evenly',
                    width: '50%'
                }}>
                    <h1>Wybierz sprz??t</h1>
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
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"Terenowy rozmiar piksela"} style={inputLabelStyle}>GSD&nbsp;[cm]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={GSD} />
                    </div>
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"??rednia wysoko???? terenu"} style={inputLabelStyle}>h&nbsp;[m]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={avgHeight} />
                    </div>
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"Pokrycie pod??u??ne"} style={inputLabelStyle}>p&nbsp;[%]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={p} />
                    </div>
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"Pokrycie poprzeczne"} style={inputLabelStyle}>q&nbsp;[%]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={q} />
                    </div>
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"Zasi??g obszaru opracowania wzd??u?? kierunku lotu"} style={inputLabelStyle}>D<sub>x</sub>&nbsp;[km]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={Dx} />
                    </div>
                    <div style={{ ...curStyle.layout }}>
                        <h2 title={"Zasi??g obszaru opracowania w poprzek kierunku lotu"} style={inputLabelStyle}>D<sub>y</sub>&nbsp;[km]</h2>
                        <Input style={{ width: '10vw', height: '4vh' }} ref={Dy} />
                    </div>
                    <Button onClick={getBase}>Oblicz</Button>
                </div>
                <div style={{
                    ...curStyle.layout,
                    flexFlow: 'column',
                    height: '100%',
                    width: '50%',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        ...curStyle.layout,
                        flexFlow: 'column',
                        justifyContent: 'space-evenly',
                        width: '30%',
                        // height: '30%',
                        border: `solid 3px ${curStyle.colours.stripes}`,
                        borderRadius: '5%',
                        backgroundColor: curStyle.colours.sky,
                        padding: '5%'
                    }}>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div style={{ ...ansLabelStyle, cursor: 'default' }}>Wysoko????&nbsp;[m]:</div> <div style={ansStyle} id={'height'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Wymiar terenowy bazy pod??u??nej"} style={ansLabelStyle}>B<sub>x</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Bx'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Wymiar terenowy bazy poprzecznej"} style={ansLabelStyle}>B<sub>y</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'By'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Terenowy zasi??g zdj??cia wzd??u?? kierunku lotu"} style={ansLabelStyle}>L<sub>x</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Lx'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Terenowy zasi??g zdj??cia w poprzek kierunku lotu"} style={ansLabelStyle}>L<sub>y</sub>&nbsp;[m]:</div> <div style={ansStyle} id={'Ly'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Liczba zdj???? w pojedynczym szeregu"} style={ansLabelStyle}>N<sub>x</sub>:</div> <div style={ansStyle} id={'Nx'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Liczba szereg??w"} style={ansLabelStyle}>N<sub>y</sub>:</div> <div style={ansStyle} id={'Ny'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div style={{ ...ansLabelStyle, cursor: 'default' }}>Czas lotu&nbsp;[min]:</div> <div style={ansStyle} id={'flightTime'} />
                        </div>
                        <div style={{ ...curStyle.layout, height: '4vh' }}>
                            <div title={"Wsp????czynnik empiryczny k"} style={ansLabelStyle}>k:</div> <div style={ansStyle} id={'k'} />
                        </div>
                    </div>
                    <Button onClick={correctBase}>
                        Dokonaj korekcji bazy
                    </Button>
                    <Button title={
                        "Znaj??c ostateczne parametry lotu nale??y jeszcze skontrolowa??, czy interwa?? czasu pomi??dzy ekspozycjami nie jest mniejszy od cyklu pracy kamery"}
                        onClick={getInterval}> Kontrola interwa??u i czas lotu
                    </Button>
                    <Button onClick={getCoefficient}>
                        Oblicz wsp????czynnik k
                    </Button>
                    {/* <Button style={{
                        width: "15vw",
                        height: "3vw",
                        fontSize: curStyle.fonts.size.m
                    }}>
                        Prezentacja wynik??w
                    </Button> */}
                </div>
            </div>
            <ToastContainer />
        </div>
        // </Route>
        // {<Route exact path={`${path}/results`}>
        //     <ResultsScreen />
        // </Route>
        // </Switch>
    );
}

export default EquipmentScreen;
