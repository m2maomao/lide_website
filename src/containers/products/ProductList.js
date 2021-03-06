import {
  useCallback, useState, useEffect, useImperativeHandle,
} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import _ from 'lodash'
import { getImage } from '@/assets/js/lib'

export default function ProductList({
  t,
  data, search, secondName, firstName, isInBottomRef,
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
    if (!loadMore) return
    setListTemp([...listTemp, ...listTotal[page + 1]])
    if ((pageTotal !== page + 2) && pageTotal > 1) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
      setPage(0)
    }
  }

  useImperativeHandle(isInBottomRef, () => ({
    loadMore: () => loadMoreData(),
  }))

  return (
    <>
      <SearchInput t={t} search={search} searchbtnvalue={t('productsearch')} />
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item">{t('product')}</li>
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
                      <Card.Img variant="top" src={getImage(item.image)} alt={item.title} />
                      <Card.Body>
                        <div className="d-flex">
                          <div>
                            <h3 className="t">{item.title}</h3>
                            <h3 className="t-2">{item.keywords}</h3>
                          </div>
                          <span className="read-wrap">
                            <i className="read" to={`/products/${item.id}`} />
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))
                : <div className="noData">{t('noproduct')}</div>
            }
          </div>
          {
            loadMore
              ? (
                <div className="load-more" onClick={loadMoreData}>
                  <span>{t('loadmore')}</span>
                </div>
              )
              : ''
          }

        </div>
      </div>
    </>

  )
}
