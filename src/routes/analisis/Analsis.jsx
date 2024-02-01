import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {GrillaEventos} from "./components/GrillaEventos.jsx";
import {EventChart} from "./components/EventChart.jsx";
import {boxFlexCenterColumn, boxFlexCenterRow} from "../../assets/styles/styles.js"
import {getAllFinancialEvents, getEventTypes, getFinancialEventsByDate} from "./services/AnalisisServices.js";
import dayjs from "dayjs";


export default function Analsis({scope}){
    const [eventRows, setEventRows] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(()=>{
        const handleFinancialEvent = {
            'mensual':() => {
                getFinancialEventsByDate(dayjs().month(),dayjs().year())
                .then((r) => {
                    console.log(r);
                    setEventRows(r)
                })
                .catch((e)=> {
                    console.log(e)
                })},
            'anual': () => {
                getAllFinancialEvents()
                .then((r) => {
                    setEventRows(r)
                })
            },
            'allTime': () => {
                getAllFinancialEvents()
                .then((r) => {setEventRows(r)
                })
            },
        }
        const financialEvent = handleFinancialEvent[scope];
        if(financialEvent) {
            console.log(financialEvent,scope)
            financialEvent()
        }
        getEventTypes().then((r) => {setEventTypes(r)});
    },[scope])


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