import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import './newsDetail.scss'

export default function NewsDetail({ t }) {
  const { id } = useParams()

  const data = useFetch(`/home/Journalism/detail?id=${id}`, { Detail: {} })

  const {
    title, create_time, content, summary, source = '', author = '',
  } = data.Detail

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/news">{t('news')}</Link>
        </li>
        <Breadcrumb.Item active>{t('newsdetails')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="news-detail-body">
        <div className="d-flex news-header">
          <div className="d-flex">
            <div className="header">
              <h2 className="t">{title}</h2>
              <span className="date">
                {`${create_time === undefined ? '' : create_time.slice(0, 10)}`}
              </span>
            </div>
            <Link to="/news" className="return">
              {t('returnlist')}
            </Link>
          </div>
        </div>
        <div className="index-1">
          <div className="index-2" />
          <div className="index-content">{summary}</div>
          <div className="index-3" />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </>
  )
}
