import { Link, Route, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Cover, Side } from 'com'

import coverImg from '@/assets/images/responsibility-cover.png'
import Info from './Info'
import Staff from './Staff'
import Community from './Community'

import './responsibility.scss'

export default function Responsibility() {
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
              <Side title="责任与关怀">
                <ul className="responsibility-arch">
                  <li className={changeCls('/responsibility/info')}>
                    <Link to="/responsibility/info">信息公开</Link>
                  </li>
                  <li className={changeCls('/responsibility/community')}>
                    <Link to="/responsibility/community">社会责任</Link>
                  </li>
                  <li className={changeCls('/responsibility/staff')}>
                    <Link to="/responsibility/staff">员工关怀</Link>
                  </li>
                </ul>
              </Side>
            </Col>
            <Col sm={9}>
              <div className="responsibility-main-body">
                <Route path="/responsibility/info" component={Info} />
                <Route path="/responsibility/community" component={Community} />
                <Route path="/responsibility/staff" component={Staff} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
