import { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ROUTES } from "../globals/ROUTES";


const ResultsScreen = ({ data }) => {

    const history = useHistory();

    useEffect(() => {
        if (!data) {
            // Toast("Data has not been calculated", 'e');
            toast.error("Brak danych wejściowych!");
            history.push(ROUTES.PARAMETERS.url);
            return
        }
        // eslint-disable-next-line
    }, [data])

    return (
        <div>result</div>
    )
}

export default ResultsScreen;