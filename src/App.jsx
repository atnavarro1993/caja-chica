import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, FormControl, TextField, Grid } from "@mui/material";
import { useForm} from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid'
function App() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    control,
    watch,
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
      console.log(res);
    } catch (error) {
      console.log(error); 
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
    </div>
  );   
}  

export default App;
