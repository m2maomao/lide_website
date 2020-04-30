import { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import _ from 'lodash'

export default function ProductList({
  data, search, secondName, firstName,
}) {
  // 父组件传入数据
  const lists = Array.isArray(data[0]) ? data[0] : data
  // 分组总数据
  const listTotal = _.chunk(lists, 9)
  // 当前页
  const [page, setPage] = useState(0)
  // 总页数
  const pageTotal = listTotal.length
  // 临时数据
  const [listTemp, setListTemp] = useState([])
  // 是否显示分页
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    setListTemp(listTotal[page])
    if (pageTotal > 1) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [lists])

  const loadMoreData = () => {
    setListTemp([...listTemp, ...listTotal[page + 1]])
    if ((pageTotal !== page + 2) && pageTotal > 1) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
      setPage(0)
    }
  }

  return (
    <>
      <SearchInput search={search} searchbtnvalue="产品搜索" />
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">首页</Link>
        </li>
        <li className="breadcrumb-item">产品与服务</li>
        <li className="breadcrumb-item">{firstName}</li>
        <Breadcrumb.Item active>{secondName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <div>
          <div className="lists-1 row row-cols-1 row-cols-md-3">

            {
              listTemp && listTemp.length ? listTemp.map((item, index) => (
                <div className="col mb-4" key={index}>
                  <Link to={`/products/${item.id}`}>
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
          {
            loadMore
              ? (
                <div className="load-more" onClick={loadMoreData}>
                  <span>加载更多</span>
                </div>
              )
              : ''
          }

        </div>
      </div>
    </>

  )
}
