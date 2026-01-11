import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthen from './hooks/useAuthen';
import { AuthenRouter, NotAuthenRouter } from './router-config';
import Devices from './screens/Devices';
import HomePage from './screens/HomePage';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Statistics from './screens/Statistics';
const AppRouter = () => {
  const [routerConfig, setRouterConfig] = useState([]);

  const { isAuthenticated } = useAuthen()
  const getConfig = async () => setRouterConfig(!isAuthenticated ? NotAuthenRouter : AuthenRouter);
  // useEffect(() => {
  //   getConfig();
  // }, [isAuthenticated])

  const renderRouter = useCallback(() => {
    if (routerConfig.length === 0)
      return null;
    const ui = routerConfig.map((router, index) => {
      const { path, Component, fullLayout } = router;
      return <Route exact key={index} path={path}
        element={<Login />}
      />
    })
    // ui.push(<Navigate to="/" />)
    return ui
  }, [routerConfig]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Set the directory path if you are deploying in sub-folder
    <BrowserRouter>
      <Routes>
        {/* {renderRouter()} */}
        {isAuthenticated ?
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<Statistics />} />
          </>
          :
          <>
            <Route path="/" element={<Login />} />
          </>
        }

        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} /> */}

      </Routes>
    </BrowserRouter>
  )
}


export default AppRouter
