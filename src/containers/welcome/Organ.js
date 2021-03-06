import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'
import http from '@/axios/http'
import { getImage } from '@/assets/js/lib'
import { lightbox2 } from 'lightbox2'
import 'lightbox2/dist/css/lightbox.css'

// import companyCover from '@/assets/images/welcome/company-cover.png'

export default function Organ({ t }) {
  const [state, setState] = useState({
    seo: '',
    content: '',
  })

  function getData() {
    http.get('/home/Enterlide/organ').then((data) => {
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
  const { content } = state

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('welcome')}</li>
        <Breadcrumb.Item active>{t('structure')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title={t('structure')} enTitle="organizationalstructure" />
          <div className="d-flex organ-summary">
            <div className="d-flex flex-column">
              <a href={getImage(content[0])} data-lightbox="images">
                <img src={getImage(content[0])} alt="" />
              </a>
            </div>
          </div>
          {/* <div className="d-flex data-summary">
            <div className="nums">
              <h3 className="big-nums">2001</h3>
              <p>成立于2001</p>
            </div>
            <div className="nums">
              <h3 className="big-nums">42</h3>
              <p>五个系列工42种聚乙烯催化剂</p>
            </div>
            <div className="nums">
              <h3 className="big-nums">60</h3>
              <p>公司产品占60%的国内市场份额</p>
            </div>
            <div className="nums">
              <h3 className="big-nums">40</h3>
              <p>用户数量达到40余家</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
