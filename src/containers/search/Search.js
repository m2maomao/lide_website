import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'
import { useFetch } from '@/hooks/useFetch'
import './search.scss'
import http from '@/axios/http'

export default function Search() {
  // 声明状态
  const [searchData, setSearchData] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const search = (sv) => {
    setSearchValue(sv)
    http.get(`/home/Index/search?search=${sv}`).then((res) => {
      if (res.status === 200) {
        setSearchData(res.data.data)
      }
    })
  }

  useEffect(() => {
    search(searchValue)
  }, [])


  return (
    <Row className="search-container">
      <Col lg={{ span: 6, offset: 3 }}>
        <SearchInput search={search} />
        {/* 有数据遍历 */}
        <div className="search-list">
          {
            searchValue && searchData.length
              ? searchData.map((item, index) => (
                <SearchItem
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
        </div>
        {/* 无数据 */}
        {
          searchValue && !searchData.length
            ? (
              <div className="n-result">
                <h4 className="t">没有找到数据</h4>
                <p>没有搜索到相关数据，试一试搜索其它关键字</p>
              </div>
            ) : ''
        }
      </Col>
    </Row>
  )
}
