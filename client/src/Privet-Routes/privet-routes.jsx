import {isLoggedIn} from "../utility/utility.js";
import {Navigate} from "react-router-dom";

const PrivetRoutes = ({children}) => {

    if(!isLoggedIn()) {
        return <Navigate to="/auth/admin/login" replace />;
    }
    return children
};

export default PrivetRoutes;