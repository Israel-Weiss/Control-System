import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './cmps/header'
import { Main } from './pages/main'
import { MainAir } from './pages/main-air'
import { UserManage } from './pages/user-manage'
import { Event } from './pages/event'
import { About } from './pages/about'
import { AirTower } from './pages/air-tower'
import './assets/css/global.css'
import './assets/scss/global.scss'

export default function App(): ReactElement {
    return (
        <div className='main-app'>
            <Header />
            <Routes>
                <Route path='' element={<Main />} />
                <Route path='air' element={<MainAir />} />
                <Route path='air/bl-a' element={<AirTower tower={'A'}/>} />
                <Route path='air/bl-b' element={<AirTower tower={'B'}/>} />
                <Route path='air/bl-c' element={<AirTower tower={'C'}/>} />
                <Route path='air/bl-d' element={<AirTower tower={'D'}/>} />
                <Route path='about' element={<About />} />
                <Route path='event' element={<Event />} />
                <Route path='user' element={<UserManage />} />
            </Routes>
        </div>
    )
}

