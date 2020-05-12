import { useState, useEffect, useCallback } from 'react'
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

import num_bg1 from '@/assets/images/welcome/num_bg1.png'
import num_bg2 from '@/assets/images/welcome/num_bg2.png'

import { createListener } from '@1eeing/scroll-listener'
import { getImage } from '@/assets/js/lib'

// import companyCover from '@/assets/images/welcome/company-cover.png'

export default function Introduce({ t }) {
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

  const [numPosition, setNumPosition] = useState(1)

  const listener = createListener({
    triggerType: 'appearing',
    offset: -500,
    positions: ['first', 'second', 'thrid', 'fourth', 'fifth', 'sixth'],
    actions: [
      (e, position) => {
        switch (e.id) {
          case 'first':
            setNumPosition(2)
            break
          case 'second':
            setNumPosition(3)
            break
          case 'thrid':
            setNumPosition(4)
            break
          default:
            setNumPosition(2)
            break
        }
        console.log('e:', e.id)
      },
      (e, position) => {
        setNumPosition(5)
        console.log('2e:', e.id)
      },
      (e, position) => {
        console.log('3e:', e.id)
      },
      (e, position) => {
        console.log('4e:', e.id)
      },
      (e, position) => {
        console.log('5e:', e.id)
      },
      (e, position) => {
        console.log('6e:', e.id)
      },
    ],
  })

  useEffect(() => {
    listener.start()
    return () => {
      listener.stop()
    }
  }, [])

  console.log(state)
  const { content, specWork } = state

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('welcome')}</li>
        <Breadcrumb.Item active>{t('introduction')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content with-line">
          <WTitle title={t('introduction')} enTitle="companyintroduction" />
          {/* 第一区 */}
          <div className={['d-flex', numPosition === 1 ? 'first-container-bg2' : 'first-container-bg1'].join(' ')} id="first">
            <div style={{ width: '50%' }}>
              <img
                style={{ width: '100%' }}
                src={content ? getImage(content[0].image) : ''}
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
          <div className={numPosition === 2 ? 'second-container-bg2' : 'second-container-bg1'} id="second">
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
            <div className={numPosition === 3 ? 'third-container-bg2' : 'third-container-bg1'} id="thrid">
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
            <div className={numPosition === 4 ? 'fourth-container-bg2' : 'fourth-container-bg1'} id="fourth">
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
          <div className={numPosition === 5 ? 'fifth-container-bg2' : 'fifth-container-bg1'} id="fifth">
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
          <div className={numPosition === 6 ? 'sixth-container-bg2' : 'sixth-container-bg1'} id="sixth">
            <div className="img-wrap">
              <img src={ci5} alt="" />
              <span
                className="bigContent"
                dangerouslySetInnerHTML={{
                  __html: content ? content[6].content : '',
                }}
              />
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
