import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, TextField, Grid, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Controller, useForm} from 'react-hook-form';
import { GrillaEventos } from "./components/GrillaEventos";
import { EventChart } from "./components/EventChart";


//TODO: agregar toas de mensaje exitoso o error

function App() {
  const [message, setMessage] = useState('');
  const [eventRows, setEventRows] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: {errors}
  } = useForm();
  const onSubmit = async (data) => {
    try{
      console.log(data);
      let res = await invoke("add_record", {
        ammount:Number(data.ammount.replace(/,/g, '.')),
        desc:data.desc,
        date:data.date,
        eventType: data.event_type
      });
      console.log(res);
      getAllFinancialEvents();
      setMessage(res)
    }catch(error){
      setMessage(error)
      console.log(error)
    }
  }; 
   
 
  const getAllFinancialEvents = async () => {
    try { 
      let res=  await invoke("get_all_records")
      setEventRows(res);
    } catch (e) {
      console.error(e); 
    }
  }
 
  const getEventTypes = async () => {
    try{
      let res = await invoke("get_all_event_types");
      setEventTypes(res);
      console.log(res);
    }catch (e){
      console.error(e)
    }
  } 

  useEffect(()=>{
    getAllFinancialEvents();
    getEventTypes();
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <GrillaEventos rows={eventRows} tipos={eventTypes}/>
      <EventChart rows={eventRows}/>
    </div>
  );
}   

export default App;
