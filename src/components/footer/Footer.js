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
      setQr(weiboCode)
    } else {
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
              <p>
                <i className="icon phone" />
                +86-021-57294218 &nbsp;&nbsp; +86-021-57294299
              </p>
              <p>
                <i className="icon phone2" />
                +86-021-57292553
              </p>
              <p>
                <i className="icon address" />
                {t('address')}
              </p>
              <p>
                <i className="icon message" />
                Leadercata@leadercata.cn
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="link-list">
              <ul className="nav-list left">
                <p>{t('product')}</p>
                <li>
                  <Link to="/">{t('center')}</Link>
                </li>
                <li>
                  <Link to="/">{t('mservice')}</Link>
                </li>
              </ul>
              <ul className="nav-list center">
                <p>{t('welcome')}</p>
                <li>
                  <Link to="/">{t('introduction')}</Link>
                </li>
                <li>
                  <Link to="/">{t('culture')}</Link>
                </li>
                <li>
                  <Link to="/">{t('qualification')}</Link>
                </li>
                <li>
                  <Link to="/">{t('history')}</Link>
                </li>
                <li>
                  <Link to="/">{t('structure')}</Link>
                </li>
                <li>
                  <Link to="/">{t('scientific')}</Link>
                </li>
                {i18n.language === 'en' ? (
                  ''
                ) : (
                  <li>
                    <Link to="/">《我与立得同行》</Link>
                  </li>
                )}
              </ul>
              <ul className="nav-list right">
                <p>{t('positions')}</p>
                <li>
                  <Link to="/">{t('information')}</Link>
                </li>
                <li>
                  <Link to="/">{t('responsibility')}</Link>
                </li>
                <li>
                  <Link to="/">{t('employee')}</Link>
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
                <img className="spacer" src={spacer} alt="spacer" />
                <img
                  onMouseEnter={handChangeCode.bind(this, 'weibo')}
                  onClick={handChangeCode.bind(this, 'weibo')}
                  className="weibo"
                  src={weibo}
                  alt="微博"
                />
              </div>
              <div className="code">
                <img className="code-img" src={qr} alt="二维码" />
                <p className="qrcode-desc">立得催化剂官方公众号</p>
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
