import {Alert, Snackbar} from "@mui/material";

function CustomToastMessage({error,message,open = false}){
    const handleToastClose = (event,reason) => {
        if (reason === 'clickaway') return false;
    }

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleToastClose}>
            <Alert onClose={handleToastClose} severity={error ? 'warning' : 'success'} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
}


export default CustomToastMessage;