import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'

export default function ProductList({ data }) {
  const lists = data[0]
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">产品与服务</li>
        <Breadcrumb.Item active>信息公开</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div>
          <CardColumns className="lists-1">
            {
              lists && lists.length ? lists.map((item, index) => (
                <Card className="item" key={index}>
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <div className="d-flex">
                      <h3 className="t">{item.title}</h3>
                      <Link className="read" to={`/products/${item.id}`} />
                    </div>
                  </Card.Body>
                </Card>
              )) : '暂无产品'
            }

          </CardColumns>
        </div>
      </div>
    </>

  )
}
