import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'

export default function ProductList({ data, search }) {
  const lists = Array.isArray(data[0]) ? data[0] : data

  return (
    <>
      <SearchInput search={search} searchbtnvalue="产品搜索" />
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">产品与服务</li>
        <Breadcrumb.Item active>催化剂产品</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div>
          <div className="lists-1 row row-cols-1 row-cols-md-3">

            {
              lists && lists.length ? lists.map((item, index) => (
                <div className="col mb-4">
                  <Link to={`/products/${item.id}`} key={index}>
                    <Card className="item">
                      <Card.Img variant="top" src={item.image} alt={item.title} />
                      <Card.Body>
                        <div className="d-flex">
                          <h3 className="t">{item.title}</h3>
                          <span className="read-wrap">
                            <i className="read" to={`/products/${item.id}`} />
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              )) : '暂无产品'
            }
          </div>
        </div>
      </div>
    </>

  )
}
