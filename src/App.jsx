import Analsis from "./routes/analisis/Analsis.jsx";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import {useState} from "react";
import EventForm from "./routes/analisis/components/EventForm.jsx";


function App() {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <div>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Ingreso / Egreso" value="1"/>
                            <Tab label="analisis mensual" value="2"/>
                            <Tab label="analisis anual" value="3"/>
                            <Tab label="analisis total" value="4"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <EventForm />
                    </TabPanel>
                    <TabPanel value="2"><Analsis scope={'mensual'}/></TabPanel>
                    <TabPanel value="3"><Analsis scope={'anual'}/></TabPanel>
                    <TabPanel value="4"><Analsis scope={'allTime'}/></TabPanel>
                </TabContext>
            </Box>
        </div>

    )
}

export default App;
