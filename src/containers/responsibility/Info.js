import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import coverImage from '@/assets/images/responsibility-c.png'
import pdfIcon from '@/assets/images/responsibility/pdf.png'
import { useState, useEffect } from 'react'

export default function Info({ t }) {
  const { list } = useFetch('/home/Responsibility/info', {
    list: [],
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const setIndex = (sv) => {
    setCurrentIndex(sv)
  }

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('positions')}</li>
        <Breadcrumb.Item active>{t('information')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="responsibility-main-container">
        <div className="r-main-container">
          <div className="p-banner">
            {
              list.map((item, index) => (
                index === currentIndex ? <Sider t={t} item={item} setIndex={setIndex} currentIndex={currentIndex} listLength={list.length} key={index} /> : ''
              ))
            }
            <img className="covers" src={coverImage} alt="img" />
          </div>
          <div className="report-lists">
            <ul>
              {
              list.map((item, index) => (
                <ReportItem title={item.title} download={item.download} key={index} t={t} />
              ))
            }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}


function Sider({
  item, setIndex, listLength, currentIndex, t,
}) {
  console.log(item)

  function setRightIndex() {
    setIndex(listLength - 1 === currentIndex ? 0 : currentIndex + 1)
  }

  function setLeftIndex() {
    setIndex(currentIndex === 0 ? listLength - 1 : currentIndex - 1)
  }

  function handleClickPreview(download) {
    window.open(download)
  }

  function handleClickDownload(download) {
    window.open(`${download} download`)
  }

  return (
    <div className="silders">
      <div className="title">
        <div className="tip">
          <i>
            {item.create_time.slice(0, 4)}
            ·
          </i>
          <span>{item.keywords}</span>
        </div>
        <div className="arrow-wrap">
          <div className="left" onClick={setLeftIndex} />
          <div className="right" onClick={setRightIndex} />
        </div>
      </div>
      <div className="content">
        {item.summary}
      </div>
      <div className="d-flex buttons">
        <button className="btns " type="button" onClick={() => handleClickPreview(item.download)}>
          <i />
          {t('onlinepreview')}
        </button>
        {/* <button className="btns " type="button" download={item.download}> */}
        <a href="###" className="btns " download={item.download}>
          <i />
          {t('filedownload')}
        </a>
        {/* </button> */}
      </div>
    </div>
  )
}

function ReportItem({ title, download, t }) {
  function handleClickPreview(download) {
    window.open(download)
  }

  function handleClickDownload(download) {
    window.open(`${download} download`)
  }
  return (
    <li className="d-flex report-item">
      <img className="file-type-icon" src={pdfIcon} alt="cover" />
      <div className="t" onClick={() => handleClickPreview(download)}>
        <h3 className="t-t">{title}</h3>
        <span className="format">{t('formatpdf')}</span>
      </div>
      <div className="options">
        <button type="button" className="preview-btn" onClick={() => handleClickPreview(download)}>
          {t('onlinepreview')}
        </button>
        <a href="###" className="download-btn" download={download}>
          {t('filedownload')}
        </a>
      </div>
    </li>
  )
}
