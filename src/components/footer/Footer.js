import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import qrcode from '@/assets/images/qrcode.png'
import weiboCode from '@/assets/images/foot/weibo.png'
import wechat from '@/assets/images/wechat.png'
import weibo from '@/assets/images/weibo.png'
import spacer from '@/assets/images/spacer.png'

import iPhone from '@/assets/images/foot/i-phone.png'
import iPhone2 from '@/assets/images/foot/i-phone2.png'
import iAddress from '@/assets/images/foot/i-address.png'
import iMessage from '@/assets/images/foot/i-message.png'
import goTop from '@/assets/images/foot/go-top.png'

import logos from '@/assets/images/logo.png'

import cols from './data'
import Logo from '../logo/Logo'

import './footer.scss'

export default function Footer({ t, i18n }) {
  const [qr, setQr] = useState(qrcode)
  const [qrStr, setQrStr] = useState(t('wechatofficialaccount'))

  const handleClickTop = () => {
    let move = window.scrollY
    const span = move / 15
    const step = () => {
      if (document.documentElement.scrollTop > 0) {
        move -= span
        window.scrollTo(0, move)
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }

  const handChangeCode = (type) => {
    if (type === 'weibo') {
      setQrStr(t('officialmicorblog'))
      setQr(weiboCode)
    } else {
      setQrStr(t('wechatofficialaccount'))
      setQr(qrcode)
    }
  }

  return (
    <Row className="footer">
      <Col lg={{ span: 10, offset: 1 }}>
        <Row>
          <Col className="phone-wrapper" xs={12} md={4}>
            <img src={logos} alt="logos" />
            <div className="phone-text">
              <p className="phone-wrap">
                <i className="icon phone" />
                <div>
                  {t('phone1')}
                  {' '}
                  <br />
                  {t('phone2')}
                </div>
              </p>
              <p>
                <i className="icon message" />
                +86-021-57292553
              </p>
              <p>
                <i className="icon address" />
                {t('address')}
              </p>
              <p>
                <i className="icon phone2" />
                Leadercata@leadercata.cn
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="link-list">
              <ul className="nav-list left">
                <p>{t('product')}</p>
                <li>
                  <Link to="/products">{t('center')}</Link>
                </li>
                <li>
                  <Link to="/products/market">{t('mservice')}</Link>
                </li>
              </ul>
              <ul className="nav-list center">
                <p>{t('welcome')}</p>
                <li>
                  <Link to="/welcome/introduce">{t('introduction')}</Link>
                </li>
                <li>
                  <Link to="/welcome/culture">{t('culture')}</Link>
                </li>
                <li>
                  <Link to="/welcome/qualification">{t('qualification')}</Link>
                </li>
                <li>
                  <Link to="/welcome/history">{t('history')}</Link>
                </li>
                <li>
                  <Link to="/welcome/organ">{t('structure')}</Link>
                </li>
                <li>
                  <Link to="/welcome/evolution">{t('scientific')}</Link>
                </li>
                {i18n.language === 'en' ? (
                  ''
                ) : (
                  <li>
                    <Link to="/welcome/magazine">《我与立得同行》</Link>
                  </li>
                )}
              </ul>
              <ul className="nav-list right">
                <p>{t('positions')}</p>
                <li>
                  <Link to="/responsibility/info">{t('information')}</Link>
                </li>
                <li>
                  <Link to="/responsibility/community">{t('responsibility')}</Link>
                </li>
                <li>
                  <Link to="/responsibility/staff">{t('employee')}</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="foot-icons">
              <div className="account">
                <img
                  onMouseEnter={handChangeCode.bind(this, 'wechat')}
                  onClick={handChangeCode.bind(this, 'wechat')}
                  className="wechat"
                  src={wechat}
                  alt="微信"
                />
                {/* <img className="spacer" src={spacer} alt="spacer" />
                <img
                  onMouseEnter={handChangeCode.bind(this, 'weibo')}
                  onClick={handChangeCode.bind(this, 'weibo')}
                  className="weibo"
                  src={weibo}
                  alt="微博"
                /> */}
              </div>
              <div className="code">
                <img className="code-img" src={qr} alt="二维码" />
                <p className="qrcode-desc">{qrStr}</p>
                <div className="top-wrapper">
                  <img
                    onClick={handleClickTop}
                    className="top"
                    src={goTop}
                    alt="top"
                  />
                </div>
              </div>
            </div>
            <p className="copyright">
              &copy;
              {t('companyname')}
              {' '}
              {t('copyright')}
              ｜
              {' '}
              {t('declaration')}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
