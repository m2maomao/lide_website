import {
  Row, Col, Button, Alert,
} from 'react-bootstrap'
import { useState, setState, useEffect } from 'react'
import { getImage } from '@/assets/js/lib'

// import {
//   Map, Marker, NavigationControl, InfoWindow,
// } from 'react-bmap'

import { Cover } from 'com'
import http from '@/axios/http'


import coverImg from '@/assets/images/contact-cover.png'
import imgAddress from '@/assets/images/contact/address.png'
import imgEmail from '@/assets/images/contact/email.png'
import imgMobile from '@/assets/images/contact/mobile.png'
import imgPrinter from '@/assets/images/contact/printer.png'
import imgWechat from '@/assets/images/contact/wechat.png'
import qrcode from '@/assets/images/qrcode.png'
import map from '@/assets/images/contact/map_bg.png'

import './contact.scss'
import { message } from 'antd'
import 'antd/dist/antd.css'

export default function Contact({ t }) {
  const [values, setValues] = useState({
    name: '',
    contact: '',
    content: '',
    company: '',
  })

  const [contentH, setContentH] = useState({
    banner: [],
    connectUs: {},
  })

  const [wechatFlag, setWechatFlag] = useState(false)

  function getData() {
    http.get('/home/index/connect').then((res) => {
      if (res.status === 200) {
        setContentH(res.data)
        console.log('res.data', res.data)
        console.log('contentH', contentH)
      }
    })
  }

  useEffect(() => {
    console.log('contentH', contentH)
  }, [contentH])

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = () => {
    if (values.name === undefined || values.name === '') {
      message.config({
        top: 500,
      })
      message.warning(t('pleasename'))
      return
    }
    if (values.contact === undefined || values.contact === '') {
      message.config({
        top: 500,
      })
      message.warning(t('pleasecontact'))
      return
    }
    if (values.content === undefined || values.content === '') {
      message.config({
        top: 500,
      })
      message.warning(t('pleasemessage'))
      return
    }
    http.post('/home/Index/message', {
      name: values.name,
      contact: values.contact,
      content: values.content,
      company: values.company,
    }).then((res) => {
      if (res.status === 200) {
        message.config({
          top: 500,
        })
        message.loading(t('thankmessage'), 2.5).then(
          () => message.success(t('messagesuccessful')),
        )
        // 清空值，需要设置成功提示
        setValues({
          name: '',
          contact: '',
          content: '',
          company: '',
        })
      }
    })
  }

  function wechatHandle() {

  }

  const onChange = (event) => {
    // 使用es6扩展运算  [event.target.name] 获取绑定的key
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <div className="contact-container">
      <Cover src={coverImg} />
      <Row className="contact-body">
        <Col lg={{ span: 10, offset: 1 }}>
          <div className="d-flex com">
            <div className="d-flex fo-c">
              <div className="form-body">
                <FormControl placeholder={t('name')} name="name" value={values.name} onChange={onChange} />
                <FormControl placeholder={t('contactway')} name="contact" value={values.contact} onChange={onChange} />
                <FormControl placeholder={t('unitbelongs')} name="company" value={values.company} onChange={onChange} require={false} />
                <FormControl placeholder={t('leavemessage')} name="content" value={values.content} onChange={onChange} type="textarea" />
                <button type="button" className="submit" onClick={handleSubmit}>
                  {t('submit')}
                </button>
              </div>
            </div>
            <div>
              <div className="address">
                <h3 className="company-name">{contentH.connectUs.title}</h3>
                <div className="d-flex">
                  <img src={imgAddress} alt="icon" />
                  <span>{contentH.connectUs.add}</span>
                </div>
                <div className="d-flex" style={{ alignItems: 'flex-start' }}>
                  <img
                    src={imgMobile}
                    alt="icon"
                    style={{ marginTop: '4px' }}
                  />
                  <pre className="telephone">{contentH.connectUs.telephone}</pre>
                </div>
                <div className="d-flex">
                  <img src={imgPrinter} alt="icon" />
                  <span>{contentH.connectUs.Fax}</span>
                </div>
                <div className="d-flex">
                  <img src={imgEmail} alt="icon" />
                  <span>{contentH.connectUs.email}</span>
                </div>
              </div>
              <div className="d-flex wechat">
                <img src={imgWechat} alt="wechat" />
                <p onClick={() => setWechatFlag(true)}>{contentH.connectUs.wechatname}</p>
                <img className="qrcode" src={getImage(contentH.connectUs.ercode)} alt="qrcode" />
              </div>
            </div>
          </div>
          {
            wechatFlag
              ? (
                <>
                  <div className="wechat-shadow" onClick={() => setWechatFlag(false)} />
                  <div className="wechat-code"><img className="qrcode" src={getImage(contentH.connectUs.ercode)} alt="qrcode" /></div>
                </>
              )
              : ''
          }
        </Col>
      </Row>
      <Row>
        <div className="map-container">
          {/* <Map center={{ lng: 116.402544, lat: 39.928216 }} zoom="11">
            <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
            <NavigationControl />
            <InfoWindow
              position={{ lng: 116.402544, lat: 39.928216 }}
              text="内容"
              title="标题"
            />
          </Map> */}
          <img src={map} alt="" />
        </div>
      </Row>
    </div>
  )
}

function FormControl({
  require = true, type = 'input', placeholder, value, onChange, name,
}) {
  return (
    <div className={`d-flex form-item ${type !== 'input' ? 'textarea' : ''}`}>
      <span className={`${require ? '' : 'n'}`} />
      {type === 'input' ? (
        <input placeholder={placeholder} value={value} name={name} onChange={onChange} />
      ) : (
        <textarea placeholder={placeholder} value={value} name={name} onChange={onChange} />
      )}
    </div>
  )
}
