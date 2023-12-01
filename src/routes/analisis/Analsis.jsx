import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {Box} from "@mui/material";
import {GrillaEventos} from "./components/GrillaEventos.jsx";
import {EventChart} from "./components/EventChart.jsx";
import {boxFlexCenterColumn, boxFlexCenterRow} from "../../assets/styles/styles.js"

export default function Analsis({scope}){
    const [eventRows, setEventRows] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
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
        }catch (e){
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllFinancialEvents();
        getEventTypes();
    },[])


    return (
        <div style={{width:'100%'}}>
            <Box sx={boxFlexCenterColumn}>
                <Box sx={boxFlexCenterRow}>
                    <GrillaEventos rows={eventRows} tipos={eventTypes}/>
                    <EventChart rows={eventRows}/>
                </Box>
            </Box>
        </div>
    );
}