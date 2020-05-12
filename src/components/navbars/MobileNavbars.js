import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useState } from 'react'
import Logo from '../logo/Logo'
import SearchButton from '../search/SearchButton'

import './navbars.scss'

function MobileNavbars(props) {
  const { t, i18n } = props

  const [menuShow, setMenuShow] = useState(false)

  // 切换中英文
  function changeLanguage() {
    const lng = i18n.language === 'en' ? 'ch' : 'en'
    i18n.changeLanguage(lng)
  }

  // 搜索
  function handleSearch() {
    console.log('search')
  }

  return (
    <div style={{ width: '100%' }} className="wap-top">
      <div className="logo-wrap">
        <Logo />
      </div>
      <div className="search-btn" onClick={() => setMenuShow(true)} />
      {/* <Navbar className="d-flex d-sm-none" bg="white" expand="lg">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">{t('home')}</Nav.Link>
            <NavDropdown title={t('welcome')}>
              <NavDropdown.Item href="#action/3.1">公司介绍</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">企业文化</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">荣誉与资质</NavDropdown.Item>
              <NavDropdown.Item href="#">发展历程（时间轴）</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">组织架构</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">科研开发</NavDropdown.Item>
            </NavDropdown>
            <Link to="/products" className="nav-link">
              {t('product')}
            </Link>
            <Link to="/news" className="nav-link">
              {t('news')}
            </Link>
            <Link to="/responsibility" className="nav-link">
              {t('positions')}
            </Link>
            <Link to="/contact" className="nav-link">
              {t('contact')}
            </Link>
          </Nav>
          <div className="nav-right">
            <SearchButton search={handleSearch} />
            <button
              type="button"
              className="switch-language-btn"
              onClick={changeLanguage}
            >
              {i18n.language === 'en' ? '中文' : 'En'}
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar> */}
      <>
        {menuShow ? <div className="menu_panel_bg" /> : ''}
        <div className={['menu', menuShow ? 'showM' : ''].join(' ')}>
          <div className="top">
            <div className="language-btn" onClick={changeLanguage}>{i18n.language === 'en' ? '中文' : 'En'}</div>
            <div className="close-btn" onClick={() => setMenuShow(false)} />
          </div>
          <ul>
            <li>{t('welcome')}</li>
            <li>{t('product')}</li>
            <li>{t('news')}</li>
            <li className="active">
              {t('positions')}
              <ul>
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
            </li>
            <li>{t('contact')}</li>
          </ul>
        </div>
      </>

    </div>
  )
}

export default MobileNavbars
