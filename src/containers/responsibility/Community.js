import { Link, Route, useRouteMatch } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useFetch } from '@/hooks/useFetch'

import Detail from './Detail'

export default function Community() {
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
              <Link to="/">首页</Link>
            </li>
            <li className="breadcrumb-item">责任与关怀</li>
            <Breadcrumb.Item active>社会责任</Breadcrumb.Item>
          </Breadcrumb>
          <div className="responsibility-main-container">
            <div className="r-main-container">
              <ul>
                {data.list.length
                  ? data.list.map((item, index) => (
                    <Item key={index} data={item} idx={index} />
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
              <Link to="/">首页</Link>
            </li>
            <li className="breadcrumb-item">责任与关怀</li>
            <li className="breadcrumb-item">
              <Link to="/responsibility/community">社会责任</Link>
            </li>
            <Breadcrumb.Item active>责任详情</Breadcrumb.Item>
          </Breadcrumb>
          <Route path="/responsibility/community/:id" component={Detail} />
        </>
      )}
    </>
  )
}

function Item({ data, idx }) {
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
          查看详情
        </Link>
      </div>
      {idx % 2 !== 0 && <img src={image} alt="cover" className="cover" />}
    </li>
  )
}
