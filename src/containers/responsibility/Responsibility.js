import { Link, Route, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Cover, Side } from 'com'

import coverImg from '@/assets/images/responsibility-cover.png'
import Info from './Info'
import Staff from './Staff'
import Community from './Community'

import './responsibility.scss'

export default function Responsibility({ t }) {
  const { pathname } = useLocation()

  function changeCls(path) {
    const cls = pathname.includes(path) ? 'arch-item active' : 'arch-item'
    return cls
  }

  return (
    <div className="responsibility-container">
      <Cover src={coverImg} />
      <Row style={{ background: '#f7f7f7' }}>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={3}>
              <Side title={t('positions')}>
                <ul className="responsibility-arch">
                  <li className={changeCls('/responsibility/info')}>
                    <Link to="/responsibility/info">{t('information')}</Link>
                  </li>
                  <li className={changeCls('/responsibility/community')}>
                    <Link to="/responsibility/community">{t('socialresponsibility')}</Link>
                  </li>
                  <li className={changeCls('/responsibility/staff')}>
                    <Link to="/responsibility/staff">{t('employee')}</Link>
                  </li>
                </ul>
              </Side>
            </Col>
            <Col sm={9}>
              <div className="responsibility-main-body">
                <Route
                  path="/responsibility/info"
                  render={(prop) => <Info t={t} />}
                />
                <Route
                  path="/responsibility/community"
                  render={(prop) => <Community t={t} />}
                />
                <Route
                  path="/responsibility/staff"
                  render={(prop) => <Staff t={t} />}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
