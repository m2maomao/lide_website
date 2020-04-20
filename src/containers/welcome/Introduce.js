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
                  __html: '<p style="font-size:14px">2016年公司完成整体扩能、升级，目前拥有<font style="font-size:24px">7</font>条聚烯烃催化剂生产线、<font style="font-size:24px">1</font>个模块化催化剂加料系统的撬装制作工场，配套尾气处理系统、公用工程系统、消防安保防护系统。公司聚烯烃催化剂生产工艺绿色环保、简洁高效，以股东方上海化工研究院有限公司的母技术为基础，自行开发完善并产业化，聚烯烃催化剂年生产能力<font style="font-size:24px">620</font>吨/年（干基）。</p>',
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
                      __html: '<p style="font-size:14px">公司产品分为镁-钛系、铬系、镁-钛-钒系三大类，由SCG、SLC、SLH、SLT和NTR五个系列共<font style="font-size:24px">42</font>种聚烯烃催化剂组成，配套产品有5种模块化催化剂加料系统、2种催化剂在线还原剂、1种表面化学处理剂。产品适用于Univation气相流化床聚乙烯工艺、Innovene气相流化床聚乙烯工艺、Borstar双峰聚乙烯工艺等8种聚乙烯生产工艺。</p>',
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
                      __html: '<p style="font-size:14px">公司拥有一支勇于创新、实力强劲的聚烯烃催化剂研发团队，拥有授权发明专利14项、实用新型专利11项、上海市科学技术进步奖2项、中国石油化工集团公司科学技术进步奖5项，参与制定了2项国家标准，连续<font style="font-size:22px">14</font>年被授予"上海市高新技术企业”。</p>',
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
                  __html: '<p style="font-size:14px">公司拥有一支专业精、技术强、素质高的聚烯烃催化剂技术服务团队，由具有丰富科研、设计、聚烯烃装置生产经验的高级技术专家组成，可为广大用户提供聚乙烯装置原始开工指导、各类型催化剂应用、各类专用料开发、催化剂加料系统改造、生产异常诊断、生产工艺优化等方面的<font style="font-size:16px">一站式、全过程、全方位技术服务。</font></p>',
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
                  __html: '<p style="font-size:14px">凭借优良的技术服务能力，客户至上的服务原则，客户及产品销量快速增长。主要客户有中国石化、中国石油、中国海油、煤化工等系统内的大型化工企业，海外主要销往中国台湾、中东、印尼、菲律宾、韩国、美国和印度等地区和国家。</p>',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
