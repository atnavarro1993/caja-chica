import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, FormControl, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {es} from 'date-fns/locale';
function App() {
  const [greetMsg, setGreetMsg] = useState("");

  const [{ammount,desc,date}, setForm] = useState({
    ammount: 0,
    desc: "",
    date: undefined
  })
 
  const sendFinancialEvent = async () => {
    try {
      let res=  await invoke("add_record", {ammount:Number(ammount),desc:desc,date:date})
      setGreetMsg(res);
    } catch (error) {
      setGreetMsg(error); 
    }
  } 
   

 
  const handleForm = (e) => {
    setForm((pre)=> ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }
 
  const handleDate = () =>{

  }
  
  return (
    <div className="container">
      <FormControl>
        <TextField onChange={handleForm} value={ammount} name="ammount"></TextField>
        <TextField onChange={handleForm} value={desc} name="desc"></TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker onChange={handleDate} value={date}></DatePicker> 
        </LocalizationProvider>
        <Button onClick={sendFinancialEvent} variant="contained">Greet</Button>
      </FormControl>
      <p>{greetMsg}</p>
      <p>{date}</p>
    </div>
  ); 
} 

export default App;
