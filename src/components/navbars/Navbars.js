import { Link, withRouter, useLocation } from 'react-router-dom'
import {
  Nav, Navbar, NavDropdown, Col,
} from 'react-bootstrap'

import { useState } from 'react'
import Logo from '../logo/Logo'
import SearchButton from '../search/SearchButton'
import MobileNavbars from './MobileNavbars'

import './navbars.scss'


function Navbars(props) {
  const { pathname } = useLocation()
  const [showNav, setShowNav] = useState(false)
  function changeCls(path) {
    const cls = pathname.includes(path) ? 'nav-link active' : 'nav-link'
    return cls
  }

  const {
    t, i18n, history, emitLanguage,
  } = props

  // 切换中英文
  function changeLanguage() {
    const lng = i18n.language === 'en' ? 'ch' : 'en'
    i18n.changeLanguage(lng)
    const lngs = i18n.language === 'en' ? 'en' : 'zh'
    emitLanguage(lngs)
  }

  // 搜索
  function handleSearch(keyword) {
    let word
    if (keyword === '') word = '员工'
    else word = keyword
    history.push(`/search/${word}`)
  }

  function handleClick(e) {
    console.log(e)
  }

  function handleSelect(key, e) {
    console.log('key is:', key)
    console.log('e is:', e)
  }

  return (
    <>
      <Col lg={{ span: 10, offset: 1 }}>
        <Navbar className="d-none d-sm-flex" bg="white" expand="lg">
          <Navbar.Brand href="/">
            <Logo />
          </Navbar.Brand>
          <Nav onSelect={handleSelect} onClick={handleClick}>
            <ul className="navbar-nav">
              <li>
                <Link
                  className={pathname === '/' ? 'nav-link active' : 'nav-link'}
                  to="/"
                  onClick={() => { setShowNav(false) }}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/welcome/introduce"
                  className={changeCls('welcome')}
                  onMouseOver={() => { setShowNav(true) }}
                  onFocus={() => 0}
                  onClick={() => { setShowNav(false) }}
                  /* onMouseOut={() => { setShowNav(false) }}
                  onBlur={() => 0} */
                >
                  {t('welcome')}
                </Link>
                {
                  showNav
                    ? (
                      <ul className="welcome">
                        <li>
                          <Link to="/welcome/introduce" onClick={() => { setShowNav(false) }}>{t('introduction')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/culture" onClick={() => { setShowNav(false) }}>{t('culture')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/qualification" onClick={() => { setShowNav(false) }}>{t('qualification')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/history" onClick={() => { setShowNav(false) }}>{t('history')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/organ" onClick={() => { setShowNav(false) }}>{t('structure')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/evolution" onClick={() => { setShowNav(false) }}>{t('scientific')}</Link>
                        </li>
                        <li>
                          <Link to="/welcome/magazine" onClick={() => { setShowNav(false) }}>{t('magazine')}</Link>
                        </li>
                      </ul>
                    )
                    : ''
                }
              </li>
              <li>
                <Link to="/products" className={changeCls('products')} onClick={() => { setShowNav(false) }}>
                  {t('product')}
                </Link>
              </li>
              <li>
                <Link to="/news" className={changeCls('news')} onClick={() => { setShowNav(false) }}>
                  {t('news')}
                </Link>
              </li>
              <li>
                <Link
                  to="/responsibility/info"
                  className={changeCls('responsibility')}
                  onClick={() => { setShowNav(false) }}
                >
                  {t('positions')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={changeCls('contact')} onClick={() => { setShowNav(false) }}>
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </Nav>
          <div className="nav-right">
            <SearchButton search={handleSearch} />
            <button
              type="button"
              className="switch-language-btn"
              onClick={changeLanguage}
            >
              {i18n.language === 'en' ? 'Ch' : 'En'}
            </button>
          </div>
        </Navbar>
      </Col>
      {/* 手机端导航栏 */}
      <MobileNavbars {...props} />
    </>
  )
}

export default withRouter(Navbars)
