import { Link, useParams, useHistory } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'

import './detail.scss'

export default function Detail({ data = [] }) {
  const [firstName, secodeName] = data
  console.log('data is:', data)
  const { id } = useParams()
  const history = useHistory()

  const [currentIndex, setIndex] = useState(0)

  console.log('id:', id)
  console.log('currentIndex:', currentIndex)

  function handleBack() {
    history.goBack()
  }

  function handleOnItemClick(index) {
    setIndex(index)
  }

  const {
    Detail: {
      title, image, content, description, summary, images,
    },
  } = useFetch(`/home/Production/detail?id=${id}`, {
    Detail: {},
  })


  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item"><Link to="/products">产品与服务</Link></li>
        <li className="breadcrumb-item"><Link to="/products">{firstName}</Link></li>
        <li className="breadcrumb-item"><Link to="/products">{secodeName}</Link></li>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div className="d-f">
          <div className="d-flex meta">
            <div className="cover">
              {images && images.length
                ? <img src={images[currentIndex].image} alt={description} />
                : ''}
            </div>
            <div className="head d-flex flex-column">
              <div>
                <h3 className="title">{title}</h3>
                <p className="summary">{summary}</p>
              </div>
              <div className="min-preview-imgs">
                <p>产品展示</p>
                <ul className="d-flex">
                  {
                    images && images.length ? images.map((item, index) => (
                      <li key={index} onClick={() => setIndex(index)}>
                        <img src={item.image} alt={item.title} />
                      </li>
                    )) : ''
                  }
                </ul>
              </div>
            </div>
          </div>
          <div
            className="product-intro"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    </>
  )
}
