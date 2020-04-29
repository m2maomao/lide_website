import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'
import http from '@/axios/http'

import companyIntro1 from '@/assets/images/welcome/companyintro1.jpg'
import companyIntro2 from '@/assets/images/welcome/companyintro2.jpg'
import companyIntro3 from '@/assets/images/welcome/companyintro3.jpg'

import ci1 from '@/assets/images/welcome/ci1.jpg'
import ci2 from '@/assets/images/welcome/ci2.jpg'
import ci3 from '@/assets/images/welcome/ci3.jpg'
import ci4 from '@/assets/images/welcome/ci4.jpg'
import ci5 from '@/assets/images/welcome/ci5.jpg'

// import companyCover from '@/assets/images/welcome/company-cover.png'

export default function Introduce() {
  const [state, setState] = useState({
    seo: '',
    content: '',
    specWork: [],
  })

  function getData() {
    http.get('/home/Enterlide/index').then((data) => {
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
  }, [])


  console.log(state)
  const { content, specWork } = state

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>公司介绍</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content with-line">
          <WTitle title="公司介绍" enTitle="companyintroduction" />
          {/* 第一区 */}
          <div className="d-flex company-summary">
            <div style={{ width: '50%' }}>
              <img
                style={{ width: '100%' }}
                src={content ? content[0].image : ''}
                alt="company"
              />
            </div>
            <div className="d-flex flex-column">
              <h4 className="company-name">
                {content ? content[0].title : ''}
              </h4>
              <div dangerouslySetInnerHTML={{
                __html: content
                  ? content[0].content : '',
              }}
              />
            </div>
          </div>
          {/* 数字区域 */}
          <div className="d-flex data-summary">
            {
              specWork.map((item, index) => (
                <div className="nums" key={index}>
                  <h3 className="big-nums">{item.blueWord}</h3>
                  <p>{item.blackWord}</p>
                </div>
              ))
            }
          </div>
          {/* 第二区 */}
          <div className="second-container">
            <div className="img-wrap">
              <img src={ci1} alt="" />
            </div>
            <div className="tip">
              <div className="header" />
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: content
                    ? content[1].content : '',
                }}
              />
            </div>
          </div>
          <div className="third-fourth-area">
            {/* 第三区 */}
            <div className="third-container">
              <div className="content-wrap">
                <div className="img-wrap">
                  <img src={ci2} alt="" />
                </div>
                <div className="tip">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? content[2].content : '',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 第四区 */}
            <div className="fourth-container">
              <div className="img-singular-wrap">
                <div className="img">
                  <img src={ci3} alt="" />
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? content[3].content : '',
                    }}
                  />
                </div>
                <div className="bg">
                  <img src={companyIntro2} alt="" />
                </div>
              </div>
            </div>
          </div>


          {/* 第五区 */}
          <div className="fifth-container">
            <div className="img-wrap">
              <img src={ci4} alt="" />
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: content
                    ? content[4].content : '',
                }}
              />
            </div>
          </div>

          {/* 第六区 */}
          <div className="sixth-container">
            <div className="img-wrap">
              <img src={ci5} alt="" />
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: content
                    ? content[5].content : '',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
