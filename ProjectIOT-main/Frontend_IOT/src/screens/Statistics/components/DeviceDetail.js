import React from 'react';
import tw, { styled } from 'twin.macro';
import '../style.css'

const TableDetail = tw.table`w-full table border-separate space-y-6 text-sm`
const TableThread = tw.thead`bg-blue-500 text-white`
const TableContent = styled.th`
  ${tw`text-left p-3 text-base font-medium`}
  `

const TableWeatherTr = styled.tr`
${` height: 36px;text-align: -webkit-center; background: #BED6E3 `},
  ${tw`pr-2`}
  `

const TableWeatherTd = styled.td(({ props }) => [
  `border-bottom: 1px solid #e6e6e6;height: 36px; `,
  props < 2 && "font-semibold"
])
const OverViewDetail = tw.div`p-6`
const OverViewSectionTitle = styled.h3`
  ${`    color: #499fbc; `},
  ${tw`mb-2`}`
const OverViewTittle = styled.h3`
${tw`mb-2 font-medium text-xl tracking-normal mb-8 w-full`}`

export default function DeviceDetail({ item, info }) {
  console.log('info', info?.current?.weather?.ic);
  return <div style={{display:'block'}}>
<div className='aqi-overview-device'>
    <div style={{ display: 'block', padding: '1rem' }}>
      <h2>Device's id: {item?._id}</h2>
      <h2>Device's name: {item?.deviceName}</h2>
      <h2>Device's userid: {item?.userId}</h2>
    </div>
    <OverViewDetail>
        <OverViewSectionTitle>Tổng quan</OverViewSectionTitle>
        <OverViewTittle>Chất lượng không khí hiện tại vị trí thiết bị {item?.deviceName || "Hanoi"} như thế nào?</OverViewTittle>
      </OverViewDetail>

      <TableDetail>
        <TableThread>
          <tr style={{ height: '48px' }}>
            <TableContent>Device's id</TableContent>
            <TableContent>Device's name</TableContent>
            <TableContent>Device's userid</TableContent>
          </tr>
        </TableThread>
        <tbody>
          <tr className="bg-blue-200 lg:text-black" style={{ textAlign: '-webkit-center', background: '#BED6E3' }}>
            <td className="p-3 ml-3 font-medium capitalize">{item?._id}</td>
            <td className="p-3 ml-3">{item?.deviceName}</td>
            <td className="p-3 ml-3">{item?.userId}</td>
          </tr>
        </tbody>
      </TableDetail>

      <OverViewDetail style={{ display: 'flex' }}>
        <div style={{ display: 'block' }}>
          <OverViewSectionTitle>Thời tiết</OverViewSectionTitle>
          <OverViewTittle>Thời tiết hiện tại ở vị trí thiết bị {item?.deviceName || "Hanoi"} ra sao?</OverViewTittle>
        </div>
        <img
          src={`/aqi/${info?.current?.weather?.ic || `01d`}.png`}
          alt="img"
          width={100}
          height={100}
          style={{ right: 0, position: 'absolute', marginRight: 40, paddingBottom: 30 }} />
      </OverViewDetail>
    
      <TableDetail>
        <tbody>
          <TableWeatherTr style={{ background: '#BED6E3' }}>
            <TableWeatherTd  >Nồng độ CO2</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{item?.stateHistory[item.stateHistory.length - 2]?.co2}</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr>
            <TableWeatherTd >Nhiệt độ</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{item?.stateHistory[item.stateHistory.length - 2]?.temperature}</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr style={{ background: '#BED6E3' }}>
            <TableWeatherTd >Độ ẩm</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{item?.stateHistory[item.stateHistory.length - 2]?.humidity}</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr>
            <TableWeatherTd >Độ bụi</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{item?.stateHistory[item.stateHistory.length - 2]?.dust}</TableWeatherTd>
          </TableWeatherTr>
        </tbody>
      </TableDetail>
    </div>
  </div>;
}
