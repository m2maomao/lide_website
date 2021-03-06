import React, {
  useState, useEffect, useImperativeHandle, useCallback, useRef,
} from 'react'
import { Row, Col } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'react-router-dom'
import './search.scss'
import http from '@/axios/http'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

export default function Search({ t }) {
  const { keyword } = useParams()

  // 声明状态
  const [searchData, setSearchData] = useState([])
  const [searchValue, setSearchValue] = useState(keyword === undefined ? null : keyword)
  // 入参
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loadMore, setLoadMore] = useState(false)
  const getSearchData = () => {
    http.get(`/home/Index/search?search=${searchValue}&page=${page}&page_size=${pageSize}`).then((res) => {
      if (res.status === 200) {
        if (page === 1) {
          setSearchData([])
          setSearchData(res.data.data)
        } else if (loadMore) {
          setSearchData(searchData.concat(res.data.data))
        }
        if (res.data.count / pageSize > page) {
          setLoadMore(true)
          setPage(page + 1)
        } else {
          setLoadMore(false)
        }
      }
    })
  }
  const search = (sv) => {
    setPage(1)
    setSearchValue(sv)
  }

  useEffect(() => {
    setPage(+1)
    setSearchData([])
    setSearchValue(searchValue)
    // search(searchValue)
    getSearchData()
  }, [searchValue])

  const isInBottomRef = useRef(null)
  // const loadMore = () => isInBottomRef.current.loadMore()
  const handleOnDocumentBottom = useCallback(() => {
    console.log(`Magazine I am at bottom! ${Math.round(performance.now())}`)
    if (!loadMore) isInBottomRef.current.loadMore()
  }, [])

  /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  useBottomScrollListener(handleOnDocumentBottom)

  useImperativeHandle(isInBottomRef, () => ({
    loadMore: () => getSearchData(),
  }))

  return (
    <Row className="search-container">
      <Col lg={{ span: 6, offset: 3 }}>
        <SearchInput t={t} search={search} keyword={searchValue} />
        {/* 有数据遍历 */}
        <div className="search-list">
          {
            searchValue && searchData.length
              ? searchData.map((item, index) => (
                <SearchItem
                  t={t}
                  key={`${item.id}${index}`}
                  id={item.id}
                  title={item.title}
                  catid={item.catid}
                  create_time={item.create_time}
                  firstColumn={item.firstColumn}
                  secondColumn={item.secondColumn}
                />
              )) : ''
          }
          {
            loadMore
              ? (
                <div className="load-more" onClick={getSearchData}>
                  <span>{t('loadmore')}</span>
                </div>
              )
              : ''
          }
        </div>
        {/* 无数据 */}
        {
          searchValue && !searchData.length
            ? (
              <div className="n-result">
                <h4 className="t">{t('nodatafound')}</h4>
                <p>{t('nodatatryother')}</p>
              </div>
            ) : ''
        }
      </Col>
    </Row>
  )
}
