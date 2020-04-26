import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Banner, Player } from 'com'

import http from '@/axios/http'

import productIcon from '@/assets/images/home/product.png'
import marketIcon from '@/assets/images/home/market.png'
import trueLeft from '@/assets/images/home/true-left.png'
import newsImg from '@/assets/images/home/news-img.png'
import line from '@/assets/images/home/line.png'
import logo from '@/assets/images/home/logo.png'
import jt1 from '@/assets/images/home/jt1.png'
import jt2 from '@/assets/images/home/jt2.png'
import jt3 from '@/assets/images/home/jt3.png'

import marketBg from '@/assets/images/home/market-bg.png'
import marketBgPh from '@/assets/images/home/market-bg-ph.png'
import productBg from '@/assets/images/home/product-bg.png'
import productBgPh from '@/assets/images/home/product-bg-ph.png'

import './home.scss'

export default function Home({ lng, t }) {
  const [state, setState] = useState({ mp4: '', news: [], banner: [] })

  function getData() {
    http.get('/home/index').then((data) => {
      if (data.status === 200) {
        setState((prevState) => ({
          ...prevState,
          ...data.data,
        }))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [lng])

  return (
    <div className="home">
      <div className="banner">
        <Row>
          <Banner lists={state.banner} />
        </Row>
      </div>
      <Row>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row className="middle-content">
            <Col className="product-service" sm={8}>
              <Row>
                <Col className="title" sm={6}>
                  <span>{t('product')}</span>
                  <img className="line" src={line} alt="" />
                  <Link to="/products">{'more >'}</Link>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="animation-wrapper">
                  <div className="animation-div product">
                    <img className="bg" src={productBg} alt="" />
                    <img className="bg-ph" src={productBgPh} alt="" />
                    <img className="jt jt1" src={jt1} alt="" />
                    <img className="jt jt2" src={jt2} alt="" />
                    <img className="jt jt3" src={jt3} alt="" />
                    <img className="icon" src={productIcon} alt="产品中心" />
                    <span>{t('center')}</span>
                  </div>
                  <div className="animation-div service">
                    <img className="bg" src={marketBg} alt="" />
                    <img className="bg-ph" src={marketBgPh} alt="" />
                    <img className="jt jt1" src={jt1} alt="" />
                    <img className="jt jt2" src={jt2} alt="" />
                    <img className="jt jt3" src={jt3} alt="" />
                    <img className="icon" src={marketIcon} alt="市场服务" />
                    <span>{t('mservice')}</span>
                  </div>
                </Col>
                <Col sm={6}>
                  <Player mp4={state.mp4} />
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <div className="news">
                <Link className="title" to="/news">
                  <p className="more-news">
                    <span className="title">{t('news')}</span>
                    <img src={trueLeft} alt="more" />
                  </p>
                </Link>
                <ul>
                  {state.news.length
                    && state.news.map((item) => (
                      <li className="news-item" key={item.id}>
                        <Link to={`/news/${item.id}`}>
                          <img
                            src={item.image}
                            // src={newsImg}
                            alt="news"
                            className="news-cover"
                          />
                          <p className="news-title">{item.title}</p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <img className="logo" src={logo} alt="logo" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
