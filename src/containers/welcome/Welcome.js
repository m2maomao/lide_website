import {
  Link, Route, Redirect, useLocation,
} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Cover, Side } from 'com'
import { useRef } from 'react'

import coverImg from '@/assets/images/responsibility-cover.png'

import Introduce from './Introduce'
import Culture from './Culture'
import Qualification from './Qualification'
import History from './History'
import Evolution from './Evolution'
import Organ from './Organ'
import Magazine from './Magazine'
import MagazineDetail from './MagazineDetail'


import './Welcome.scss'

export default function Welcome() {
  const { pathname } = useLocation()

  function changeCls(path) {
    const cls = pathname === path ? 'arch-item active' : 'arch-item'
    return cls
  }

  return (
    <div className="responsibility-container">
      <Cover src={coverImg} />
      <Row style={{ background: '#f7f7f7' }}>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={3}>
              <Side title="走进立得">
                <ul className="responsibility-arch">
                  <li className={changeCls('/welcome/introduce')}>
                    <Link to="/welcome/introduce">公司介绍</Link>
                  </li>
                  <li className={changeCls('/welcome/culture')}>
                    <Link to="/welcome/culture">企业文化</Link>
                  </li>
                  <li className={changeCls('/welcome/qualification')}>
                    <Link to="/welcome/qualification">资质与荣誉</Link>
                  </li>
                  <li className={changeCls('/welcome/history')}>
                    <Link to="/welcome/history">发展历程</Link>
                  </li>
                  <li className={changeCls('/welcome/organ')}>
                    <Link to="/welcome/organ">组织架构</Link>
                  </li>
                  <li className={changeCls('/welcome/evolution')}>
                    <Link to="/welcome/evolution">科研开发</Link>
                  </li>
                  <li className={changeCls('/welcome/magazine')}>
                    <Link to="/welcome/magazine">《我与立得同行》</Link>
                  </li>
                </ul>
              </Side>
            </Col>
            <Col sm={9}>
              <div className="welcome-main-body">
                {/* <Redirect to="/welcome/introduce" /> */}
                <Route path="/welcome/introduce" component={Introduce} />
                <Route path="/welcome/culture" component={Culture} />
                <Route
                  path="/welcome/qualification"
                  component={Qualification}
                />
                <Route path="/welcome/history" component={History} />
                <Route path="/welcome/organ" component={Organ} />
                <Route path="/welcome/evolution" component={Evolution} />
                <Route path="/welcome/magazine" component={Magazine} />
                <Route path="/welcome/MagazineDetail/:id" component={MagazineDetail} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
