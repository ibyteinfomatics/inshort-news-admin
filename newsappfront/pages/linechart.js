import React from 'react';
import { Chart as chartjs, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2';

chartjs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)

export default function LineChart({dashboard}){
    const yearMonths = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const driverValue = [];
    const customerValue = [];
    
    dashboard?.drivers_per_month.forEach(item =>{
        driverValue[item?._id?.month - 1] = item?.number_of_drivers;
    })

    dashboard?.customers_per_month.map(item =>{
        customerValue[item?._id?.month - 1] = item?.number_of_customers;
    })
 
    const data = {
        labels: yearMonths,
        datasets: [
            {
            label: 'Drivers',
            data: driverValue,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                'rgba(75, 99, 132, 0.5)',
                'rgba(255, 162, 235, 0.5)',
                'rgba(54, 206, 86, 0.5)',
                'rgba(153, 192, 192, 0.5)',
                'rgba(255, 102, 255, 0.5)',
                'rgba(54, 159, 64, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                'rgba(75, 99, 132, 1)',
                'rgba(255, 162, 235, 1)',
                'rgba(54, 206, 86, 1)',
                'rgba(153, 192, 192, 1)',
                'rgba(255, 102, 255, 1)',
                'rgba(54, 159, 64, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'Customers',
            data: customerValue,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',

                'rgba(75, 99, 132, 0.5)',
                'rgba(255, 162, 235, 0.5)',
                'rgba(54, 206, 86, 0.5)',
                'rgba(153, 192, 192, 0.5)',
                'rgba(255, 102, 255, 0.5)',
                'rgba(54, 159, 64, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

                'rgba(75, 99, 132, 1)',
                'rgba(255, 162, 235, 1)',
                'rgba(54, 206, 86, 1)',
                'rgba(153, 192, 192, 1)',
                'rgba(255, 102, 255, 1)',
                'rgba(54, 159, 64, 1)',
            ],
            borderWidth: 1
        }
    ]
    }
    var options = {
        maintainAspectRation: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return(
        <>
            <div style={{width: "450px", marginLeft: 'auto', marginRight: 'auto'}}>
                <Line 
                    data={data}
                    height={200}
                    options={options}
                />
            </div>
        </>
    )
}
