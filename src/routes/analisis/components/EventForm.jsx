import {Button, FormControl, Grid, InputLabel, MenuItem, Select,TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getEventTypes, onSubmit} from "../services/AnalisisServices.js";
import CustomToastMessage from "../../../common/ToastMessage.jsx";


export default function EventForm(){

    const [message, setMessage] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control
    } = useForm();

    useEffect(() => {
        getEventTypes().then((r)=>{setEventTypes(r)});
    }, []);

    const handleOnSubmit = async (data) =>{
        await onSubmit(data)
            .then((r)=>{
                setMessage(r);
                setOpen(true);
            })
            .catch((e)=>{
                setMessage(e);
                setOpen(true);
                setError(true);
            });
    }

    return(
        <>
            <CustomToastMessage error={error} message={message} open={open}/>
            <form onSubmit={handleSubmit(handleOnSubmit)} style={{marginLeft: 'auto', marginRight: 'auto'}}>
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