import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import { WTitle } from 'com'
import $ from 'jquery'

import imgAcquire from '@/assets/images/welcome/imgAcquire.png'

import Limarquee from 'limarquee'
import './evolution.css'

export default function Evolution({ t }) {
  const { content: { development = {}, acquire = {} } } = useFetch('/home/Enterlide/evolution', {
    content: {
      development: {},
      acquire: {},
    },
  })

  useEffect(() => {
    $(() => {
      console.log('jquery~~~')
      const limarquee = new Limarquee('.img-carousel')
      limarquee.render({
        direction: 'left', // 滚动方向，可选 left / right / up / down
        loop: -1, // 循环次数，-1 为无限循环
        scrolldelay: 0, // 每次重复之前的延迟
        scrollamount: 100, // 滚动速度，越大越快
        circular: true, // 无缝滚动，如果为 false， 则和 marquee 效果一样
        drag: true, // 鼠标可拖动
        runshort: false, // 内容不足是否滚动
        hoverstop: true, // 鼠标悬停暂停
        xml: false, // 加载 xml 文件
        inverthover: false, // 反向，即默认不滚动，鼠 标悬停滚动
      })
    })
  }, [acquire])

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('welcome')}</li>
        <Breadcrumb.Item active>{t('scientific')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title={t('scientific')} enTitle="scientificresearch" />
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
                <h3 className="t">{t('awardswon')}</h3>
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
