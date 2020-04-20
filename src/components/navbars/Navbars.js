import { Link, withRouter, useLocation } from 'react-router-dom'
import {
  Nav, Navbar, NavDropdown, Col,
} from 'react-bootstrap'

import Logo from '../logo/Logo'
import SearchButton from '../search/SearchButton'
import MobileNavbars from './MobileNavbars'

import './navbars.scss'

function Navbars(props) {
  const { pathname } = useLocation()

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
  function handleSearch() {
    history.push('/search')
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
            <Link
              className={pathname === '/' ? 'nav-link active' : 'nav-link'}
              to="/"
            >
              {t('home')}
            </Link>
            <Link to="/welcome/introduce" className={changeCls('welcome')}>
              {t('welcome')}
            </Link>
            <Link to="/products" className={changeCls('products')}>
              {t('product')}
            </Link>
            <Link to="/news" className={changeCls('news')}>
              {t('news')}
            </Link>
            <Link
              to="/responsibility/info"
              className={changeCls('responsibility')}
            >
              {t('positions')}
            </Link>
            <Link to="/contact" className={changeCls('contact')}>
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
