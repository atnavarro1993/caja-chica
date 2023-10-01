import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, FormControl, TextField, Grid } from "@mui/material";
import { useForm} from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid'
import { GrillaEventos } from "./components/GrillaEventos";
import { EventChart } from "./components/EventChart";
function App() {
  const [message, setMessage] = useState('');
  const [eventRows, setEventRows] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const onSubmit = async (data) => {
    try{
      let res = await invoke("add_record", {
        ammount:Number(data.ammount),
        desc:data.desc,
        date:data.date
      });
      console.log(res);
      getAllFinancialEvents();
      setMessage(res)
    }catch(error){
      setMessage(error)
    }
  }; 
   
 
  const getAllFinancialEvents = async () => {
    try { 
      let res=  await invoke("get_all_records")
      setEventRows(res);
    } catch (error) {
      console.log(error); 
    }
  }  
 
  const getEventTypes = async () => {
    try{

    }catch (e){
      
    }
  }

  useEffect(()=>{
    getAllFinancialEvents();
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
            <Button type="submit" variant="contained">ingresar</Button>
          </Grid>
        </Grid>
      </form>
      <p>{message}</p>
      <GrillaEventos rows={eventRows}/>
      <EventChart rows={eventRows}/>
    </div>
  );
}   

export default App;
