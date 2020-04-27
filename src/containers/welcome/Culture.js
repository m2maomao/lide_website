import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'
import http from '@/axios/http'

import imgCulture1 from '@/assets/images/welcome/culture1.png'
import imgCulture2 from '@/assets/images/welcome/culture2.png'
import imgCulture3 from '@/assets/images/welcome/culture3.png'
import imgCulture4 from '@/assets/images/welcome/culture4.png'
import imgBrand from '@/assets/images/welcome/brand.png'
import imgValue from '@/assets/images/welcome/value.png'
import imgSocial from '@/assets/images/welcome/social.png'

export default function Culture() {
  const [state, setState] = useState({
    content: [],
  })

  function getData() {
    http.get('/home/Enterlide/culture').then((data) => {
      if (data.status === 200) {
        setState((prevState) => ({
          ...prevState,
          ...data.data,
        }))
      }
    })
  }

  // const { content } = state
  console.log('state.content[0]', state.content[0])
  console.log('state', state)
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>企业文化</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title="企业文化" enTitle="corporateculture" />
          <div className="culture-body">
            <div className="d-flex culture-item">
              <img src={imgCulture1} alt="images" />
              <Texts icon={imgBrand} title="品牌理念" list={state.content[0]} />
              <img src={imgCulture3} alt="images" />
            </div>
            <div className="d-flex culture-item">
              <Texts icon={imgValue} title="价值理念" list={state.content[1]} />
              <img src={imgCulture2} alt="images" />
              <Texts icon={imgSocial} title="社会责任" list={state.content[2]} />
            </div>
          </div>
          <img className="bottom-image" src={imgCulture4} alt="ima" />
        </div>
      </div>
    </>
  )
}

function Texts({
  icon, title, list,
}) {
  return (
    <div className="d-flex flex-column texts">
      <div className="d-flex t">
        <img className="icon" src={icon} alt="icon" />
        <h3 className="head">{title}</h3>
      </div>
      <div>
        {
          list && list.map((item, index) => (
            <div className="d-flex words" key={index}>
              {
                item.blueWord
                  ? <span className="blue-text">{item.blueWord}</span>
                  : <span className="blue-text" style={{ padding: '3px', minWidth: '0' }}>{item.blueWord}</span>
              }

              <p>{item.blackWord}</p>
            </div>
          ))
        }

        {/* <div className="d-flex words">
          <span className="blue-text">使命</span>
          <p>成为和饭卡和饭卡和饭卡和</p>
        </div> */}
      </div>
    </div>
  )
}
