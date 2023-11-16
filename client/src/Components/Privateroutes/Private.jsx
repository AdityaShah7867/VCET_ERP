import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';


const Private = () => {

    // const [isAuth, setisAuth] = useState(false);

    const [auth] = useAuth()


    return (
        <>
            {localStorage.getItem('auth') ? <Outlet /> : <Navigate to="/" />}
        </>
    );
};

export default Private;