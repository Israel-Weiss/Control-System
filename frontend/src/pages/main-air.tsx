import { ReactElement } from "react"
import { Link } from "react-router-dom"
import fan from '../assets/imgs/control1.jpg'
import t1 from '../assets/imgs/tA.jpg'
import t2 from '../assets/imgs/tB.jpg'
import t3 from '../assets/imgs/tC.jpg'
import t4 from '../assets/imgs/tD.jpg'

export function MainAir(): ReactElement {

    return <div className="main-air-continer">
        <section className='title'>Room control - Tower menu</section>
        <div className='screen-continer'>
            <img className='main-img' src={fan} alt="" />
            <div className='button-continer'>
                <Link to={'bl-a'}><button className="button">
                    <div className="text">Tower A</div>
                    <img className='img' src={t1} alt="" />
                </button></Link>
                <Link to={'bl-b'}><button className="button">
                    <div className="text">Tower B</div>
                    <img className='img' src={t2} alt="" />
                </button></Link>
                <Link to={'bl-c'}><button className="button">
                    <div className="text">Tower C</div>
                    <img className='img' src={t3} alt="" />
                </button></Link>
                <Link to={'bl-d'}><button className="button">
                    <div className="text">Tower D</div>
                    <img className='img' src={t4} alt="" />
                </button></Link>
            </div>
        </div>
    </div>
}