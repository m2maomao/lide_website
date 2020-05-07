import { Link, Route, useRouteMatch } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import Detail from './Detail'

export default function Community({ t }) {
  const { isExact } = useRouteMatch()

  const data = useFetch('/home/Responsibility/society', {
    list: [],
  })

  return (
    <>
      {isExact ? (
        <>
          <Breadcrumb>
            <li className="breadcrumb-item">
              <Link to="/">{t('home')}</Link>
            </li>
            <li className="breadcrumb-item">{t('positions')}</li>
            <Breadcrumb.Item active>{t('responsibility')}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="responsibility-main-container">
            <div className="r-main-container">
              <ul>
                {data.list.length
                  ? data.list.map((item, index) => (
                    <Item t={t} key={index} data={item} idx={index} />
                  ))
                  : ''}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <Breadcrumb>
            <li className="breadcrumb-item">
              <Link to="/">{t('home')}</Link>
            </li>
            <li className="breadcrumb-item">{t('positions')}</li>
            <li className="breadcrumb-item">
              <Link to="/responsibility/community">{t('responsibility')}</Link>
            </li>
            <Breadcrumb.Item active>{t('responsibilitydetail')}</Breadcrumb.Item>
          </Breadcrumb>
          <Route
            path="/responsibility/community/:id"
            render={(prop) => <Detail t={t} />}
          />
        </>
      )}
    </>
  )
}

function Item({ data, idx, t }) {
  const {
    title, summary, create_time, image, id,
  } = data

  return (
    <li className="d-flex community-item">
      {idx % 2 === 0 && <img src={image} alt="cover" className="cover" />}
      <div className="community-text">
        <h2 className="t">{title}</h2>
        <p className="text">{summary}</p>
        <p className="date">{create_time}</p>
        <Link to={`/responsibility/community/${id}`} className="read-datail">
          {t('viewdetails')}
        </Link>
      </div>
      {idx % 2 !== 0 && <img src={image} alt="cover" className="cover" />}
    </li>
  )
}
