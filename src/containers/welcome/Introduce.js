import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'
import http from '@/axios/http'

// import companyCover from '@/assets/images/welcome/company-cover.png'

export default function Introduce() {
  const [state, setState] = useState({
    seo: '',
    content: '',
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
  const { content } = state

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
        <div className="p-1r-content">
          <WTitle title="公司介绍" enTitle="companyintroduction" />
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
