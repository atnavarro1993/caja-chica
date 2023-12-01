import {ArcElement, Chart as ChartJS, 
    Legend, 
    Title, 
    Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
)

export const EventChart = ({rows}) =>{
    if(rows.length === 0){
        return <></>
    }
    const datos = new Map();
    rows.forEach(x => {
        if(!datos.get(x.event_type_id)){
            datos.set(x.event_type_id,x.amount)
        }else{
            datos.set(x.event_type_id, datos.get(x.event_type_id) + x.amount)
        }
    });


    const data = {
        labels: ["ingresos","egresos"],
        datasets:[
            {
                data: Array.from(datos,([key,value])=> (value)),
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: ['rgba(3, 71, 1, 1)','rgba(156, 148, 5, 1)'],
            }
        ]
    };
    
    const options = {
        maintainAspectRatio: true,
        responsive: true
        }

    return (
        <div style={{padding:'20px',width:'400px'}}>
            <Pie  data={data} options={options}/>
        </div>

    ) 
}

