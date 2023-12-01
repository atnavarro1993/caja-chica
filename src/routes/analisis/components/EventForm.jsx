import {Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {invoke} from "@tauri-apps/api/tauri";
import {useEffect, useState} from "react";


export default function EventForm(){

    const [message, setMessage] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [open ,setOpen] = useState(false);
    const [error, setError] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();
    const onSubmit = async (data) => {
        try{
            await invoke("add_record", {
                ammount:Number(data.ammount.replace(/,/g, '.')),
                desc:data.desc,
                date:data.date,
                eventType: data.event_type
            }).then((r) =>{
                setMessage(r)
                setError(false);
                handleToastOpen()
            });
        }catch(error){
            setMessage(error)
            setError(true);
            handleToastOpen()
        }
    };
    const handleToastOpen = () => {
        setOpen(true);
    }
    const handleToastClose = (event,reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);

    }

    useEffect(() => {
        getEventTypes();
    }, []);
    const getEventTypes = async () => {
        try{
            let res = await invoke("get_all_event_types");
            setEventTypes(res);
        }catch (e){
            console.error(e)
        }
    }

    return(
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} severity={error ? 'warning' : 'success'} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item>
                        <TextField {...register("ammount")} label="$" name="ammount"/>
                    </Grid>
                    <Grid item>
                        <TextField {...register("desc")} label="descripcion" name="desc"/>
                    </Grid>
                    <Grid item>
                        <TextField {...register("date")} name="date" type="date"/>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="evnType-label">tipo</InputLabel>
                            <Controller name="event_type" control={control} defaultValue=""
                                        render={({field}) => (
                                            <Select {...field} style={{minWidth: '100px'}} label="tipo">
                                                {eventTypes.map((x) => {
                                                    return <MenuItem key={x.id} value={x.id}>{x.event_type}</MenuItem>
                                                })}
                                            </Select>
                                        )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">ingresar</Button>
                    </Grid>
                </Grid>
            </form>
        </>

    )
}