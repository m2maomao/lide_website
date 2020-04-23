import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

import coverImage from '@/assets/images/responsibility-c.png'
import pdfIcon from '@/assets/images/responsibility/pdf.png'

export default function Info() {
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">责任与关怀</li>
        <Breadcrumb.Item active>催化剂产品</Breadcrumb.Item>
      </Breadcrumb>
      <div className="responsibility-main-container">
        <div className="r-main-container">
          <div className="p-banner">
            <Sider />
            <img className="covers" src={coverImage} alt="img" />
          </div>
          <div className="report-lists">
            <ul>
              <ReportItem />
              <ReportItem />
              <ReportItem />
              <ReportItem />
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

function Sider() {
  return (
    <div className="silders">
      <div className="title">
        <div className="tip">
          <i>2019·</i>
          <span>第四季度</span>
        </div>
        <div className="arrow-wrap">
          <div className="left" />
          <div className="right" />
        </div>
      </div>
      <div className="content">
        2019年四季度环境监测数据公示，一季度环境监测数据公示，2019年一季度环境监测数据公示，一季度环境监测数据公示。
      </div>
      <div className="d-flex buttons">
        <button className="btns active" type="button">
          <i />
          在线预览
        </button>
        <button className="btns" type="button">
          <i />
          文件下载
        </button>
      </div>
    </div>
  )
}

function ReportItem() {
  return (
    <li className="d-flex report-item">
      <img className="file-type-icon" src={pdfIcon} alt="cover" />
      <div className="t">
        <h3 className="t-t">2019年第三季度报告全文</h3>
        <span className="format">格式：PDF</span>
      </div>
      <div className="options">
        <button type="button" className="preview-btn">
          在线预览
        </button>
        <button type="button" className="download-btn">
          文件下载
        </button>
      </div>
    </li>
  )
}
