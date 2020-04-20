import { Row, Col, Button } from 'react-bootstrap'
// import {
//   Map, Marker, NavigationControl, InfoWindow,
// } from 'react-bmap'

import { Cover } from 'com'

import coverImg from '@/assets/images/contact-cover.png'
import imgAddress from '@/assets/images/contact/address.png'
import imgEmail from '@/assets/images/contact/email.png'
import imgMobile from '@/assets/images/contact/mobile.png'
import imgPrinter from '@/assets/images/contact/printer.png'
import imgWechat from '@/assets/images/contact/wechat.png'
import qrcode from '@/assets/images/qrcode.png'

import './contact.scss'

export default function Contact() {
  function handleSubmit() {
    console.log('1111')
  }

  function handleClick() {}

  return (
    <div className="contact-container">
      <Cover src={coverImg} />
      <Row className="contact-body">
        <Col lg={{ span: 10, offset: 1 }}>
          <div className="d-flex com">
            <div className="d-flex fo-c">
              <div className="form-body">
                <FormControl placeholder="姓名" />
                <FormControl placeholder="联系方式" />
                <FormControl placeholder="所属单位" require={false} />
                <FormControl placeholder="留言" type="textarea" />
                <Button className="submit" onClick={handleSubmit}>
                  提交
                </Button>
              </div>
            </div>
            <div>
              <div className="address">
                <h3 className="company-name">上海立得催化剂有限公司</h3>
                <div className="d-flex">
                  <img src={imgAddress} alt="icon" />
                  <span>地址：</span>
                  <p>上海市金山区金环路288号</p>
                </div>
                <div className="d-flex" style={{ alignItems: 'flex-start' }}>
                  <img
                    src={imgMobile}
                    alt="icon"
                    style={{ marginTop: '4px' }}
                  />
                  <span>电话：</span>
                  <div>
                    <p>综合管理部：(+86) 021-57294218</p>
                    <p>综合管理部：(+86) 021-57294299</p>
                  </div>
                </div>
                <div className="d-flex">
                  <img src={imgPrinter} alt="icon" />
                  <span>传真：</span>
                  <p>(+86) 021-57292553</p>
                </div>
                <div className="d-flex">
                  <img src={imgEmail} alt="icon" />
                  <span>邮箱：</span>
                  <p>Leadercata@leadercata.cn</p>
                </div>
              </div>
              <div className="d-flex wechat">
                <img src={imgWechat} alt="wechat" />
                <p>立得催化剂官方公众号</p>
                <img className="qrcode" src={qrcode} alt="qrcode" />
              </div>
            </div>
          </div>
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
        </div>
      </Row>
    </div>
  )
}

function FormControl({ require = true, type = 'input', placeholder }) {
  return (
    <div className={`d-flex form-item ${type !== 'input' ? 'textarea' : ''}`}>
      <span className={`${require ? '' : 'n'}`} />
      {type === 'input' ? (
        <input placeholder={placeholder} />
      ) : (
        <textarea placeholder={placeholder} />
      )}
    </div>
  )
}
