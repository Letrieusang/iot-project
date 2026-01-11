import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toastError, toastSuccess } from "../../constant/toast";
import { addDeviceByIdFetch, deleteDeviceById, getDeviceById, getUserDevices, updateDeviceByIdFetch } from "../../services/devicesServices";

//context
export const DevicesContext = createContext({})

//hook
export const useDevicesContext = () => useContext(DevicesContext)

//provider
export const DevicesContextProvider = ({ children }) => {
  const [listDevices, setListDevices] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [deviceItem, setDeviceItem] = useState()
  const [openAddModal, setOpenAddModal] = useState(false)


  useEffect(() => {
    getListDevices()

  }, [])

  const getListDevices = async () => {
    const res = await getUserDevices()
    setListDevices(res?.devices)
  }

  const deleteDevice = async (id) => {
    const res = await deleteDeviceById(id)
    if (!res?.error) {
      toastSuccess("Delete Complete!")
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } else {
      toastError("Delete Incomplete!")
    }
  }

  const updateDevice = async (id, name, state) => {
    let tmp = `{ "deviceName": "${name}", "connectState": "${state}" }`
    let params = JSON.parse(tmp)
    // const res = await updateDeviceById(id, params)
    const res = await updateDeviceByIdFetch(id, params)
    if (!res?.error) {
      toastSuccess("Update Complete!")
      await getListDevices()
      window.location.reload()
    } else {
      toastError("Update Incomplete!")
    }
  }

  const addDevice = async (id, name, state) => {
    const tmp = `{ "embedId": "${id}", "deviceName": "${name}", "connectState": "OFF"}`;
    const params = JSON.parse(tmp);

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
          params.location = [pos?.coords?.latitude, pos?.coords?.longitude];

          const res = await addDeviceByIdFetch(params);
          if (!res?.error) {
            toastSuccess("Add Complete!");
            await getListDevices();
            window.location.reload();
          } else {
            toastError("Add Incomplete!");
          }
        },
        async (err) => {
          console.log("Geolocation error:", err);
          // ✅ fallback: vẫn add device dù không có location
          // (giữ nguyên behavior add, chỉ thiếu location)
          const res = await addDeviceByIdFetch(params);
          if (!res?.error) {
            toastSuccess("Add Complete! (no location)");
            await getListDevices();
            window.location.reload();
          } else {
            toastError("Add Incomplete!");
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
  };


  const getDeviceItemById = async (id) => {
    let tmp = await getDeviceById(id)
    if (tmp?.device) setDeviceItem(tmp?.device)
  }

  const value = useMemo(() => ({
    listDevices, getListDevices, deleteDevice, updateDevice, openModal,
    setOpenModal, getDeviceItemById, deviceItem, openAddModal, setOpenAddModal, addDevice
  }),
    // eslint-disable-next-line no-sequences
    [listDevices, openModal, deviceItem, openAddModal])
  return (
    <DevicesContext.Provider value={value}>
      {children}
    </DevicesContext.Provider>
  )
}