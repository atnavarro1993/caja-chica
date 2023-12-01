import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export default function CustomToastMessage({error,message,open = false}){

    const handleToastClose = (event,reason) => {
        if (reason === 'clickaway') return;
        open = false
    }

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleToastClose}>
            <Alert onClose={handleToastClose} severity={error ? 'warning' : 'success'} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}
