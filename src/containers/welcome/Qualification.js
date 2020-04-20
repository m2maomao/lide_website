import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'

import imgQual from '@/assets/images/welcome/qualification.png'
import imgHonor from '@/assets/images/welcome/honor.png'
import demo1 from '@/assets/images/welcome/demo1.png'
import demo2 from '@/assets/images/welcome/demo2.png'

export default function Qualification() {
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>资质与荣誉</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title="资质与荣誉" enTitle="Qualificationandhonor" />
          <div className="qualification-honor">
            <div className="qualification">
              <div className="d-flex h">
                <img className="c" src={imgQual} alt="icon" />
                <h3 className="t">资质</h3>
              </div>
              <div className="d-flex wrapper">
                <Item src={demo1} info="高新技术企业" />
                <Item src={demo2} info="高新技术企业" />
                <Item info="高新技术企业" />
                <Item info="高新技术企业" />
                <Item info="高新技术企业" />
              </div>
            </div>
            <div className="borders" />
            <div className="honor">
              <div className="d-flex h">
                <img className="c" src={imgHonor} alt="icon" />
                <h3 className="t">荣誉</h3>
              </div>
              <div className="d-flex wrapper">
                <Item info="高新技术企业" />
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
