import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import './newsDetail.scss'

export default function NewsDetail() {
  const { id } = useParams()

  const data = useFetch(`/home/Journalism/detail?id=${id}`, { Detail: {} })

  const { title, create_time, content } = data.Detail

  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/news">新闻动态</Link>
        </li>
        <Breadcrumb.Item active>新闻详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className="news-detail-body">
        <div className="d-flex news-header">
          <div className="d-flex">
            <div className="header">
              <h2 className="t">{title}</h2>
              <span className="date">{create_time === undefined ? '' : create_time.slice(0, 10)}</span>
            </div>
            <Link to="/news" className="return">
              返回列表
            </Link>
          </div>
        </div>
        <div className="index-1">
          <div className="index-2" />
          <div className="index-content">测试未添加</div>

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
