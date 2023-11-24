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
    
    datos.forEach(x => {
        console.log(x)
    })

    const datosArray = Array.from(datos,([key,value])=> (value));
    console.log(datosArray);
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
        }

    return (
        <div>
            <Pie data={data} options={options}/>
        </div>
    ) 
}

