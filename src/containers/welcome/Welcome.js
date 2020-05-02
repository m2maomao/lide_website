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

export default function Welcome({ t }) {
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
              <Side title={t('welcome')}>
                <ul className="responsibility-arch">
                  <li className={changeCls('/welcome/introduce')}>
                    <Link to="/welcome/introduce">{t('introduction')}</Link>
                  </li>
                  <li className={changeCls('/welcome/culture')}>
                    <Link to="/welcome/culture">{t('culture')}</Link>
                  </li>
                  <li className={changeCls('/welcome/qualification')}>
                    <Link to="/welcome/qualification">{t('qualification')}</Link>
                  </li>
                  <li className={changeCls('/welcome/history')}>
                    <Link to="/welcome/history">{t('history')}</Link>
                  </li>
                  <li className={changeCls('/welcome/organ')}>
                    <Link to="/welcome/organ">{t('structure')}</Link>
                  </li>
                  <li className={changeCls('/welcome/evolution')}>
                    <Link to="/welcome/evolution">{t('scientific')}</Link>
                  </li>
                  <li className={changeCls('/welcome/magazine')}>
                    <Link to="/welcome/magazine">{t('magazine')}</Link>
                  </li>
                </ul>
              </Side>
            </Col>
            <Col sm={9}>
              <div className="welcome-main-body">
                {/* <Redirect to="/welcome/introduce" /> */}
                <Route path="/welcome/introduce" render={(prop) => <Introduce t={t} />} />
                <Route path="/welcome/culture" render={(prop) => <Culture t={t} />} />
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
