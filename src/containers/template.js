import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Cover, Side } from 'com'
import coverImg from '@/assets/images/responsibility-cover.png'

export default function Responsibility() {
  return (
    <div className='responsibility-container'>
      <Cover src={coverImg} />
      <Row>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={4}>
              <Side title='责任与关怀'>
                <ul>
                  <li>
                    <Link to='/'>信息公开</Link>
                  </li>
                  <li>
                    <Link to='/'>社会责任</Link>
                  </li>
                  <li>
                    <Link to='/'>员工关怀</Link>
                  </li>
                </ul>
              </Side>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
