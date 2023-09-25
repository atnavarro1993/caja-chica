import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, FormControl, TextField } from "@mui/material";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [{name,lastName,age}, setForm] = useState({
    name: "",
    lastName: "",
    age: ""
  })

  const showMessage = async () => {
    console.log();
    setGreetMsg(await invoke("greet", {name:name,last_name:lastName,age:age}));
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
        <TextField onChange={handleForm} value={name} name="name"></TextField>
        <TextField onChange={handleForm} value={lastName} name="lastName"></TextField>
        <TextField onChange={handleForm} value={age} name="age"></TextField>
        <Button variant="contained" onClick={showMessage}>Greet</Button>
      </FormControl>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
