import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useState } from 'react'
import Logo from '../logo/Logo'
import SearchButton from '../search/SearchButton'

import './navbars.scss'

function MobileNavbars(props) {
  const { t, i18n, history } = props

  const [menuShow, setMenuShow] = useState(false)

  // 二级带单动态
  const nav = [
    {
      name: t('home'),
      link: '/',
      children: [],
    },
    {
      name: t('welcome'),
      link: '',
      active: false,
      children: [
        {
          name: t('introduction'),
          link: '/welcome/introduce',
        },
        {
          name: t('culture'),
          link: '/welcome/culture',
        },
        {
          name: t('qualification'),
          link: '/welcome/qualification',
        },
        {
          name: t('history'),
          link: '/welcome/history',
        },
        {
          name: t('structure'),
          link: '/welcome/organ',
        },
        {
          name: t('scientific'),
          link: '/welcome/evolution',
        },
      ],
    },
    {
      name: t('product'),
      link: '',
      active: false,
      children: [
        {
          name: t('center'),
          link: '/products',
        },
        {
          name: t('mservice'),
          link: '/products/market',
        },
      ],
    },
    {
      name: t('news'),
      link: '/news',
      children: [],
    },
    {
      name: t('positions'),
      link: '',
      active: false,
      children: [
        {
          name: t('information'),
          link: '/responsibility/info',
        },
        {
          name: t('responsibility'),
          link: '/responsibility/community',
        },
        {
          name: t('employee'),
          link: '/responsibility/staff',
        },
      ],
    },
    {
      name: t('contact'),
      link: '/contact',
      children: [],
    },
  ]

  const [staticNav, setStaticNav] = useState(nav)

  // 展示隐藏二级菜单
  const navTemp = JSON.parse(JSON.stringify(nav))

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
    setStaticNav(nav)
    history.push(src)
  }

  function handleSecondClick(index) {
    navTemp.forEach((item, i) => {
      if (i === index) {
        navTemp[i].active = !item.active
      }
    })
    setStaticNav(navTemp)
  }

  return (
    <div style={{ width: '100%' }} className="wap-top">
      <div className="logo-wrap">
        <Logo />
      </div>
      <div className="right-box">
        <div className="search-btn" onClick={() => handleClick('/search')} />
        <div className="menu-btn" onClick={() => setMenuShow(true)} />
      </div>
      <>
        {menuShow ? <div className="menu_panel_bg" /> : ''}
        <div className={['menu', menuShow ? 'showM' : ''].join(' ')}>
          <div className="top">
            <div className="language-btn" onClick={changeLanguage}>{i18n.language === 'en' ? '中文' : 'En'}</div>
            <div className="close-btn" onClick={() => setMenuShow(false)} />
          </div>
          <ul>
            {
              staticNav.length && staticNav.map((item, index) => {
                // 判断是否无下级导航
                if (!item.children.length) {
                  return <li key={index} onClick={() => handleClick(item.link)}>{item.name}</li>
                }
                return (
                  <li key={index} onClick={() => handleSecondClick(index)} className={['second', item.active ? 'active' : ''].join(' ')}>
                    {item.name}
                    <ul>
                      {
                        item.active && item.children.map((i, k) => <li key={k} onClick={() => handleClick(i.link)}>{i.name}</li>)
                      }
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>

    </div>
  )
}

export default MobileNavbars
