import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, FormControl, TextField } from "@mui/material";


function App() {
  //const [greetMsg, setGreetMsg] = useState("");

  const [{ammount,desc,date}, setForm] = useState({
    ammount: "",
    desc: "",
    date: ""
  })
 
  const showMessage = async () => {
    try {
      let test=  await invoke("add_record", {ammount:Number(ammount),desc:desc,date:date})
      console.log(test);
    } catch (error) {
      console.log(error);
    }
  }


  const handleForm = (e) => {
    setForm((pre)=> ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

 
  return (
    <div className="container">
      <FormControl>
        <TextField onChange={handleForm} value={ammount} name="ammount"></TextField>
        <TextField onChange={handleForm} value={desc} name="desc"></TextField>
        <TextField onChange={handleForm} value={date} name="date"></TextField>
        <Button onClick={showMessage} variant="contained">Greet</Button>
      </FormControl>

    </div>
  );
}

export default App;
