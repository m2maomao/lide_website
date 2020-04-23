import { Link, useParams, useHistory } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import './detail.scss'

export default function Detail() {
  const { id } = useParams()
  const history = useHistory()

  console.log('id:', id)

  function handleBack() {
    history.goBack()
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
        <li className="breadcrumb-item">产品与服务</li>
        <li className="breadcrumb-item">产品与服务</li>
        <Breadcrumb.Item active>催化剂产品</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div className="d-f">
          <div className="d-flex meta">
            <div className="cover">
              <img src={image} alt={description} />
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
                      <li key={index}>
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
