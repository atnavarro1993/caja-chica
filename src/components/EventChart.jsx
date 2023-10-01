import {CategoryScale, Chart as ChartJS, 
    Legend, 
    LineElement, 
    LinearScale, 
    PointElement, 
    Title, 
    Tooltip} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)



export const EventChart = ({rows}) =>{

    if(rows.length === 0){
        return <></>
    }
    const labels = rows.map(x=>x.date);
    const options = {
        responsive: true,
        plugins:{
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'eventos financieros'
            }
        },
        tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                const datasetLabel = tooltipItem.dataset.label || '';
                const desc = rows[tooltipItem.dataIndex].desc;
                return `${datasetLabel}: ${tooltipItem.yLabel} - ${desc}`;
              },
            },
          },
    };

    const data = {

        labels,
        datasets:[
            {
                label: 'Dataset 1',
                data: rows.map((rows) => rows.ammount),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };
    

    return (
        <>
        <Line options={options} data={data} />
        </>
    ) 
}

