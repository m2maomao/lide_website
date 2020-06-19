import { Link, useParams, useHistory } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import { getImage } from '@/assets/js/lib'

import './detail.scss'

export default function Detail({ data = [], t }) {
  const [firstName, secodeName, lists] = data
  let FN = firstName
  let SN = secodeName
  // console.log('lists', lists)
  // console.log('data is:', data)
  const { id } = useParams()
  const history = useHistory()

  const [currentIndex, setIndex] = useState(0)
  lists.map((item) => {
    if (+item.id === +id) {
      // console.log('item.firstColumn', item.firstColumn)
      if (item.firstColumn) {
        FN = item.firstColumn
        SN = item.secondColumn
      }
    }
    return true
  })

  // console.log('id:', id)
  // console.log('currentIndex:', currentIndex)

  function handleBack() {
    history.goBack()
  }

  function handleOnItemClick(index) {
    setIndex(index)
  }

  const {
    Detail: {
      title, image, content, description, summary, images, keywords,
    },
  } = useFetch(`/home/Production/detail?id=${id}`, {
    Detail: {},
  })

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item"><Link to="/products">{t('product')}</Link></li>
        <li className="breadcrumb-item"><Link to="/products">{FN}</Link></li>
        <li className="breadcrumb-item"><Link to="/products">{SN}</Link></li>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div className="d-f">
          <div className="d-flex meta">
            <div className="cover">
              {images && images.length
                ? <img src={getImage(images[currentIndex].image)} alt={description} />
                : ''}
            </div>
            <div className="head d-flex flex-column">
              <div className="topback d-flex flex-row">
                <div>
                  <h3 className="title">
                    {title}
                    {' '}
                    {keywords}
                  </h3>
                  <p className="summary">{summary}</p>
                </div>
                <button type="button" className="return" onClick={handleBack}>
                  {t('returnlist')}
                </button>
              </div>

              <div className="min-preview-imgs">
                <p>{t('productdisplay')}</p>
                <ul className="d-flex">
                  {
                    images && images.length ? images.map((item, index) => (
                      <li key={index} onClick={() => setIndex(index)}>
                        <img src={getImage(item.image)} alt={item.title} />
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
