import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { iDate } from '../../../utils/iDate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const BarChart = ({ deviceItem }) => {

  let label = []
  let co2 = []
  let dust = []
  let humidity = []
  let temperature = []
  deviceItem?.forEach(element => {
    label.push(iDate(element?.at, '{j}/{n}/{f}, {h}:{m} '))
    co2.push(element?.co2)
    dust.push(element?.dust)
    humidity.push(element?.humidity)
    temperature.push(element?.temperature)
  });
  label = label.slice(label?.length - 11, label?.length - 1).reverse()

  co2 = co2.slice(co2?.length - 11, co2?.length - 1).reverse()

  dust = dust.slice(dust?.length - 11, dust?.length - 1).reverse()

  humidity = humidity.slice(humidity?.length - 11, humidity?.length - 1).reverse()

  temperature = temperature.slice(temperature?.length - 11, temperature?.length - 1).reverse()


  //   const data = {
  //     label,
  //     datasets: [
  //       {
  //         label: 'CO2',
  //         data: co2,
  //         borderColor: 'red',
  //         backgroundColor: 'red',
  //       },
  //     ]
  //   };


  // return <Bar options={options} data={data} />
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight:'100vh' }}>
      <Bar
        style={{ maxWidth: '50%', maxHeight:'50%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "CO2",
              backgroundColor: [
                "#FF6363",
              ],
              data: co2
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Statistics of CO2"
          }
        }}
      />
      <Bar
        style={{ maxWidth: '50%', maxHeight:'50%'  }}
        data={{
          labels: label,
          datasets: [
            {
              label: "Dust",
              backgroundColor: [
                "#FFAB76",
              ],
              data: dust
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Statistics of CO2"
          }
        }}
      />
      <Bar
        style={{ maxWidth: '50%', maxHeight:'50%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "Humidity",
              backgroundColor: [
                "#FFFDA2",
              ],
              data: humidity
            }
          ]
        }}
        options={{
          legend: { display: false },

          title: {
            display: true,
            text: "Statistics of CO2"
          }
        }}
      />
      <Bar
        style={{ maxWidth: '50%', maxHeight:'51%' }}
        data={{
          labels: label,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: [
                "#BAFFB4",
              ],
              data: temperature
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Statistics of CO2"
          }
        }}
      />
    </div>
  )

}
export default BarChart
