import React, { useEffect, useState } from 'react';
import Signin from './page/auth/Signin';

const Privateroutes= ({Children}: any) => {
    const [exists,setexists] = useState(false)
    useEffect(()=>{
        let user_desc = localStorage.getItem('userdetail');
        if(user_desc){
            setexists(true)
        }
    },[])

    return(
        <>
        {exists ? <Children/>: <Signin/>}
        </>
    )
};

export default Privateroutes;