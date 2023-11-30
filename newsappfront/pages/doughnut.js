import React from 'react';
import { Chart as chartjs, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

chartjs.register(
    Tooltip,
    Legend,
    ArcElement
)

export default function DoughnutChart({dashboard}){
    console.log(dashboard)
    const data = {
        labels: ['Completed', 'Pending', 'Ongoing'],
        datasets: [{
            label: 'Number of Jobs',
            // data: [dashboard?.completeBooking, dashboard?.upcommingBooking, dashboard?.pendingBooking, dashboard?.cancelledBooking, dashboard?.runningBooking],
            data : [dashboard?.totalCompletedJobs, dashboard?.totalPendingJobs, dashboard?.totalOnGoingJobs],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
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
            <div style={{width: "350px", marginLeft: 'auto', marginRight: 'auto'}}>
                <Doughnut 
                    data={data}
                    height={200}
                    options={options}
                />
            </div>
        </>
    )
}
