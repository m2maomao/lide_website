import { Row, Col } from 'react-bootstrap'
import { SearchItem, SearchInput } from 'com'

import './search.scss'

export default function Search() {
  return (
    <Row className="search-container">
      <Col lg={{ span: 6, offset: 3 }}>
        <SearchInput />
        <div className="search-list">
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
        </div>
        {/* <div className="n-result">
          <h4 className="t">没有找到数据</h4>
          <p>没有搜索到相关数据，试一试搜索其它关键字</p>
        </div> */}
      </Col>
    </Row>
  )
}
