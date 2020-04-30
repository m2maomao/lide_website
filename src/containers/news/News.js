import { Route, Link, useRouteMatch } from 'react-router-dom'
import { Row, Col, Breadcrumb } from 'react-bootstrap'
import { Cover, Side, NewItem } from 'com'
import { useFetch } from '@/hooks/useFetch'

import coverImg from '@/assets/images/news-cover.png'
import NewsDetail from '../newsDetail/NewsDetail'

import './news.scss'

export default function News() {
  const { isExact } = useRouteMatch()

  const data = useFetch('/home/Journalism/index', {
    newsHot: [],
    newsList: [],
  })

  const { newsHot, newsList } = data

  return (
    <div className="news-body">
      <Cover src={coverImg} />
      <Row>
        <Col lg={{ span: 10, offset: 1 }}>
          <Row>
            <Col sm={4}>
              <Side title="新闻动态">
                <div className="a-next">
                  <button type="button" className="sc-r recommend-btn">
                    推荐新闻
                  </button>
                  {newsHot.length
                    ? newsHot.map((item) => (
                      <div key={item.id}>
                        <div className="preview-news">
                          <span className="date">{item.create_time}</span>
                          <Link to={`/news/${item.id}`}>
                            <h3 className="t">{item.title}</h3>
                          </Link>
                          <p className="content">{item.summary}</p>
                          <div className="clx">
                            <Link to={`/news/${item.id}`} className="more" />
                          </div>
                        </div>
                      </div>
                    ))
                    : ''}
                </div>
              </Side>
            </Col>
            <Col sm={8}>
              <div className="news-main-container">
                {isExact ? (
                  <>
                    <Breadcrumb>
                      <li className="breadcrumb-item">
                        <Link to="/">首页</Link>
                      </li>
                      <Breadcrumb.Item active>新闻动态</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="news-detail-body">
                      <ul className="new-lists">
                        {newsList.length
                          ? newsList.map((item, index) => (
                            <NewItem data={item} key={item.id} index={index} />
                          ))
                          : ''}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Route path="/news/:id" component={NewsDetail} />
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
