import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"




export const GrillaEventos = ({rows}) => {

    console.log(rows);
     
    const columns =[
        {field:'id',headerName:'ID', flex:1},
        {field: 'ammount',headerName:'amount', flex:1},
        {field: 'desc',headerName:'Desc.', flex:1},
        {field: 'date',headerName:'Date', flex:1}
    ]
 
    if(rows.length != 0){
        return(
            <Box sx={{width:'60%',maxWidth:'40%'}}>
                <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick/>
            </Box>
            )
    }
    return(
        <></>
    )
}

