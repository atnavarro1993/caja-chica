import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {Box} from "@mui/material";
import {GrillaEventos} from "./components/GrillaEventos.jsx";
import {EventChart} from "./components/EventChart.jsx";
import {boxFlexCenterColumn, boxFlexCenterRow} from "../../assets/styles/styles.js"
import {getAllFinancialEvents, getEventTypes} from "./services/AnalisisServices.js";

export default function Analsis({scope}){
    const [eventRows, setEventRows] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(()=>{
        getAllFinancialEvents().then((r) => {setEventRows(r)});
        getEventTypes().then((r) => {setEventTypes(r)});
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