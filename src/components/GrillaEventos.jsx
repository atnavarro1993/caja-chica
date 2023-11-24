import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"



export const GrillaEventos = ({rows,tipos}) => {
    rows.forEach(x =>{
        x.tipo = tipos.find(y => y.id ==x.event_type_id).event_type
    })
    if(rows.length === 0){
        return <></>;
    }    
    const columns =[
        {field:'id',headerName:'ID', flex:1},
        {field: 'amount',headerName:'amount', flex:1},
        {field: 'desc',headerName:'Desc.', flex:1},
        {field: 'tipo',headerName:'tipo', flex:1},
        {field: 'date',headerName:'Date', flex:1}
    ]
  
    return(
        <Box sx={{width:'60%',maxWidth:'40%'}}>
            <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[5, 10]}/>
        </Box>
        )
}

