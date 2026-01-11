/* eslint-disable no-fallthrough */
import React, { memo, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { MapContextProvider, useMapContext } from '../context';
import '../style.css';

const OverViewSumary = styled.div(({ props }) => [
  tw`text-xs justify-between w-full rounded-t-md p-8 bg-green-500`,
  props <= 50 && tw`bg-green-500`,
  props <= 100 && props >= 51 && tw`bg-yellow-500 text-yellow-800`,
  props <= 150 && props >= 101 && tw`bg-red-300 text-red-600`,
  props <= 200 && props >= 151 && tw`bg-red-500 text-red-800`,
  props <= 300 && props >= 201 && tw`bg-purple-500 text-purple-800`,
  props > 300 && tw`bg-red-900 text-white`
])
const AqiValueWrapper = tw.div`flex-row flex`
const AqiBox = styled.div(({ props }) => [
  tw`text-white flex-col items-start rounded-default mr-6 p-3 flex bg-green-700 `,
  `width:116px;height:116px`,
  props <= 50 && tw`bg-green-500`,
  props <= 100 && props >= 51 && tw`bg-yellow-700`,
  props <= 150 && props >= 101 && tw`bg-red-500`,
  props <= 200 && props >= 151 && tw`bg-red-700`,
  props <= 300 && props >= 201 && tw`bg-purple-700`,
  props > 300 && tw`bg-red-900`
])

const AqiContent = styled.span(({ props }) => [
  props <= 150 && props >= 101 ? tw`text-xl` : tw`text-4xl`
])

const AqiUnit = tw.p`text-base uppercase contents pb-4`
const AqiValue = tw.p`text-2xl contents absolute mb-0`

const AqiStatus = tw.p`text-xs font-medium uppercase`

const OverViewDetail = tw.div`p-6`
const OverViewSectionTitle = styled.h3`
  ${`    color: #499fbc; `},
  ${tw`mb-2`}`

const OverViewTittle = styled.h3`
${tw`mb-2 font-medium text-xl tracking-normal mb-8 w-full`}`

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

const NearestCityInfoImpl = () => {
  const { nearestCity } = useMapContext()
  const [status, setStatus] = useState('')
  const [face, setFace] = useState()


  const renderStatus = (props) => {
    if (props <= 50) {
      setStatus(`Tốt`)
      setFace(`/aqi/ic-face-green.svg`)
    }
    else if (props <= 100 && props >= 51) {
      setStatus(`Trung bình`)
      setFace(`/aqi/ic-face-yellow.svg`)
    }
    else if (props <= 150 && props >= 101) {
      setStatus(`Không lành mạnh cho các nhóm nhạy cảm`)
      setFace(`/aqi/ic-face-orange.svg`)
    }
    else if (props <= 200 && props >= 151) {
      setStatus(`Không lành mạnh`)
      setFace(`/aqi/ic-face-red.svg`)
    }
    else if (props <= 300 && props >= 201) {
      setStatus(`Rất không lành mạnh`)
      setFace(`/aqi/ic-face-purple.svg`)
    }
    else if (props > 301) {
      setStatus(`Nguy hiểm`)
      setFace(`/aqi/ic-face-maroon.svg`)
    }
    else {
      setStatus(`Không có thông tin`)
      setFace(`/aqi/ic-face-green.svg`)
    }

  }
  useEffect(() => {
    renderStatus(nearestCity?.current?.pollution?.aqius)
  }, [nearestCity?.current?.pollution?.aqius])


  return (
    <div className='aqi-overview'>
      <OverViewSumary props={nearestCity?.current?.pollution?.aqius}>
        <AqiValueWrapper>
          <AqiBox props={nearestCity?.current?.pollution?.aqius}>
            <AqiUnit>US AQI</AqiUnit>
            <br />
            <AqiValue>{nearestCity?.current?.pollution?.aqius} *</AqiValue>

          </AqiBox>
          <AqiStatus>
            <span>chỉ số AQI trực tiếp</span>
            <br />
            <AqiContent props={nearestCity?.current?.pollution?.aqius||0}>{status}</AqiContent>
          </AqiStatus>

          <img src={face} alt="img" width={116} height={116} />
        </AqiValueWrapper>
      </OverViewSumary>
      <OverViewDetail>
        <OverViewSectionTitle>Tổng quan</OverViewSectionTitle>
        <OverViewTittle>Chất lượng không khí hiện tại gần {nearestCity?.city || "Hanoi"}, {nearestCity?.country || "Vietnam"} như thế nào?</OverViewTittle>
      </OverViewDetail>

      <TableDetail>
        <TableThread>
          <tr style={{ height: '48px' }}>
            <TableContent>Mức ô nhiễm không khí</TableContent>
            <TableContent>Chỉ số chất lượng không khí</TableContent>
            <TableContent>Chất gây ô nhiễm chính</TableContent>
          </tr>
        </TableThread>
        <tbody>
          <tr className="bg-blue-200 lg:text-black" style={{ textAlign: '-webkit-center', background: '#BED6E3' }}>
            <td className="p-3 ml-3 font-medium capitalize">{status}</td>
            <td className="p-3 ml-3">{nearestCity?.current?.pollution?.aqius} US AQI</td>
            <td className="p-3 ml-3">{nearestCity?.current?.pollution?.mainus === "p2" && <p>PM2.5</p>}</td>
          </tr>
        </tbody>
      </TableDetail>

      <OverViewDetail style={{ display: 'flex' }}>
        <div style={{ display: 'block' }}>
          <OverViewSectionTitle>Thời tiết</OverViewSectionTitle>
          <OverViewTittle>Thời tiết hiện tại ở {nearestCity?.city || "Hanoi"}, {nearestCity?.country || "Vietnam"} ra sao?</OverViewTittle>
        </div>
        <img
          src={`/aqi/${nearestCity?.current?.weather?.ic ||`01d`}.png`}
          alt="img"
          width={100}
          height={100}
          style={{ right: 0, position: 'absolute', marginRight: 40, paddingBottom: 30 }} />
      </OverViewDetail>

      <TableDetail>
        <tbody>
          <TableWeatherTr style={{ background: '#BED6E3' }}>
            <TableWeatherTd  >Thời tiết</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{nearestCity?.current?.pollution?.aqius} US AQI</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr>
            <TableWeatherTd >Nhiệt độ</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{nearestCity?.current?.weather?.tp} Celcius</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr style={{ background: '#BED6E3' }}>
            <TableWeatherTd >Độ ẩm</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{nearestCity?.current?.weather?.hu} %</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr>
            <TableWeatherTd >Gió</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{nearestCity?.current?.weather?.ws} km/h</TableWeatherTd>
          </TableWeatherTr>
          <TableWeatherTr style={{ background: '#BED6E3' }}>
            <TableWeatherTd >Áp suất</TableWeatherTd>
            <TableWeatherTd style={{ fontWeight: 600, borderRadius: '0 0.625rem  0.625rem 0' }}>{nearestCity?.current?.weather?.pr} mb</TableWeatherTd>
          </TableWeatherTr>
        </tbody>
      </TableDetail>
    </div>
  )
}
const NearestCityInfo = () => <MapContextProvider><NearestCityInfoImpl /></MapContextProvider>
export default memo(NearestCityInfo)
