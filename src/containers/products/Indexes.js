import {
  useCallback, useState, useEffect, useImperativeHandle,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, CardColumns, Card } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import './Indexes.scss'
import { useFetch } from '@/hooks/useFetch'
import _ from 'lodash'

export default function Indexes({
  data, isInBottomRef, t,
}) {
  const [lists, setLists] = useState([])
  // 请求数据
  const { content, marketService } = useFetch('/home/Production/allindexproduct?index=1', {
    content: [],
    marketService: [],
  })
  // 分组总数据
  const [listTotal, setListTotal] = useState([])
  // 当前页
  const [page, setPage] = useState(0)
  // 总页数
  const pageTotal = listTotal.length
  // 临时数据
  const [listTemp, setListTemp] = useState([])
  // 是否显示分页
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    console.log('1111111')
    if (content[0]) {
      const tempData = []
      content.map((a) => a.firstChildren.map((b) => b.children.map((c) => c.map((d) => tempData.push(d)))))
      setLists(tempData)
      console.log('tempData', tempData)
    }
  }, [content])

  useEffect(() => {
    console.log('2222222')
    console.log('lists', lists)
    setListTotal(_.chunk(lists, 20))
  }, [lists])

  useEffect(() => {
    console.log('listTotal', listTotal)
    setListTemp(listTotal[page])
    if (pageTotal > 1) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [listTotal])

  const loadMoreData = () => {
    console.log(1)
    if (!loadMore) return
    console.log(1)
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

  const history = useHistory()

  const search = (sv) => {
    history.push({
      pathname: '/products',
      state: { sv },
    })
  }

  function goto(url) {
    console.log('url', url)
    history.push({
      pathname: url,
    })
  }

  return (
    <>
      <SearchInput t={t} search={search} searchbtnvalue={t('productsearch')} />
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">{t('home')}</Link>
        </li>
        <Breadcrumb.Item active>{t('productindex')}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-side-container">
        <table className="table table-striped table-borderless">
          <thead className="thead-dark">
            <tr>
              <th scope="col" width="10%">{t('series')}</th>
              <th scope="col">{t('category')}</th>
              <th scope="col">{t('type')}</th>
              <th scope="col" width="20%">{t('siptbs')}</th>
              <th scope="col">{t('applicableprocess')}</th>
            </tr>
          </thead>
          <tbody>
            {
              listTemp && listTemp.map((item, index) => (
                <tr key={index} onClick={() => goto(`/products/${item.id}`)}>
                  <td>{item.serialtype}</td>
                  <td>
                    {item.title}
                    {' '}
                    {item.keywords}
                  </td>
                  <td>{item.kind}</td>
                  <td>{item.replaceproduct}</td>
                  <td>{item.adapttech}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
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
    </>

  )
}
