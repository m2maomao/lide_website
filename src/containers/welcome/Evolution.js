import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import { WTitle } from 'com'
import $ from 'jquery'

import imgAcquire from '@/assets/images/welcome/imgAcquire.png'

export default function Evolution() {
  const { content: { development = {}, acquire = {} } } = useFetch('/home/Enterlide/evolution', {
    content: {
      development: {},
      acquire: {},
    },
  })

  function scroll() {
    console.log('执行钩子函数!')
  }

  useEffect(() => {
    scroll()
  }, [])

  // console.log('data is:', data)

  // const { }
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>科研开发</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title="科研开发" enTitle="scientificresearch" />
          <div className="scientificre-search-wrapper">
            <p className="text">{development.summary}</p>
            <div className="d-flex development-images">
              <div className="img-list-wrap">
                {
                  development.images && development.images.map((item, index) => (
                    <div className="box" key={index}>
                      <div className="img-wrap" style={{ background: `url(${item.image}) center center / auto 120% no-repeat` }} />
                      <div className="title">{item.title}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="borders" />
            <div className="acquire">
              <div className="d-flex h">
                <img className="c" src={imgAcquire} alt="icon" />
                <h3 className="t">所获奖项</h3>
              </div>
              <p className="text">{acquire.summary}</p>
              <div className="img-carousel">
                <ul>
                  {
                    acquire.images && acquire.images.map((item, index) => (
                      <li key={index}>
                        <img src={item.image} alt="" />
                        <h6>{item.title}</h6>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

function Item({ src, info }) {
  return (
    <div className="item">
      <div className="img-c">
        <img className="certificate" src={src} alt="证书" />
      </div>
      <p className="i-intro">{info}</p>
    </div>
  )
}
