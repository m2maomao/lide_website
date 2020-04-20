import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import { WTitle } from 'com'

import imgAcquire from '@/assets/images/welcome/imgAcquire.png'

export default function Evolution() {
  const { content: { development = {}, acquire = {} } } = useFetch('/home/Enterlide/evolution', {
    content: {
      development: {},
      acquire: {},
    },
  })

  // console.log('data is:', data)

  // const { }
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">走进立得</li>
        <Breadcrumb.Item active>科研开发</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-1r">
        <div className="p-1r-content">
          <WTitle title="科研开发" enTitle="scientificresearch" />
          <div className="scientificre-search-wrapper">
            <p className="text">{development.summary}</p>
            <div className="d-flex development-images">
              <CardColumns>
                {
                  development.images && development.images.map((item, index) => (
                    <Card key={index}>
                      <Card.Img variant="top" src="holder.js/100px160" />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  ))
                }
              </CardColumns>
            </div>
            <div className="borders" />
            <div className="acquire">
              <div className="d-flex h">
                <img className="c" src={imgAcquire} alt="icon" />
                <h3 className="t">所获奖项</h3>
              </div>
              <p className="text">{acquire.summary}</p>
              <div className="img-carousel" />
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
