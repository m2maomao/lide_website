import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useState } from 'react'
import Logo from '../logo/Logo'
import SearchButton from '../search/SearchButton'


import './navbars.scss'

function MobileNavbars(props) {
  const { t, i18n, history } = props

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

  // 跳转
  function handleClick(src) {
    setMenuShow(false)
    history.push(src)
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
            <li onClick={() => handleClick('/')}>{t('home')}</li>
            <li onClick={() => handleClick('/welcome/introduce')}>{t('welcome')}</li>
            <li onClick={() => handleClick('/products')}>{t('product')}</li>
            <li onClick={() => handleClick('/news')}>{t('news')}</li>
            <li className="active">
              {t('positions')}
              <ul>
                <li onClick={() => handleClick('/responsibility/info')}>{t('information')}</li>
                <li onClick={() => handleClick('/responsibility/community')}>{t('responsibility')}</li>
                <li onClick={() => handleClick('/responsibility/staff')}>{t('employee')}</li>
              </ul>
            </li>
            <li onClick={() => handleClick('/contact')}>{t('contact')}</li>
          </ul>
        </div>
      </>

    </div>
  )
}

export default MobileNavbars
