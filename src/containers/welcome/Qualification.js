import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { WTitle } from 'com'
import { useFetch } from '@/hooks/useFetch'
import { useEffect } from 'react'

import imgQual from '@/assets/images/welcome/qualification.png'
import imgHonor from '@/assets/images/welcome/honor.png'
import demo1 from '@/assets/images/welcome/demo1.png'
import demo2 from '@/assets/images/welcome/demo2.png'
import $ from 'jquery'
import { lightbox2 } from 'lightbox2'
import 'lightbox2/dist/css/lightbox.css'
import { getImage } from '@/assets/js/lib'

export default function Qualification({ t }) {
  const { content } = useFetch('/home/Enterlide/aptitude', {
    content: [],
  })

  useEffect(() => {
    console.log('useEffect')
  }, [])

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('welcome')}</li>
        <Breadcrumb.Item active>{t('qualification')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title={t('qualification')} enTitle="Qualificationandhonor" />
          <div className="qualification-honor" id="lightgallery">
            <div className="qualification">
              <div className="d-flex h">
                <a href={imgQual}>
                  <img className="c" src={imgQual} alt="icon" />
                </a>
                {
                   content.map((item, index) => (
                     index === 0 ? <h3 className="t" key={index}>{item.name}</h3> : ''
                   ))
                }

              </div>
              <div className="d-flex wrapper">
                {
                   content.map((item, index) => (
                     index === 0 ? item.imgs.map((item, index) => (
                       <Item src={item} key={index} />
                     )) : ''
                   ))
                }
              </div>
            </div>
            <div className="borders" />
            <div className="honor">
              <div className="d-flex h">
                <img className="c" src={imgHonor} alt="icon" />
                {
                   content.map((item, index) => (
                     index === 1 ? <h3 className="t" key={index}>{item.name}</h3> : ''
                   ))
                }
              </div>
              <div className="wrapper">
                {
                   content.map((item, index) => (
                     index === 1 ? item.imgs.map((item, index) => (
                       <Item src={item} key={index} />
                     )) : ''
                   ))
                }
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
        <a href={getImage(src)} data-lightbox="images">
          <img className="certificate" src={getImage(src)} alt="证书" />
        </a>
      </div>
      <p className="i-intro">{info}</p>
    </div>
  )
}
