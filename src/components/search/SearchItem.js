import { Link } from 'react-router-dom'

import './searchItem.scss'

export default function SearchItem() {
  return (
    <div className="d-flex search-item">
      <div>
        <h3 className="title">2020*迎新春团拜会</h3>
        <span className="date">2020/01/01</span>
      </div>
      <div>
        <i className="read-more-icon" />
        <Link to="/" className="read-more-link">
          阅读详情
        </Link>
      </div>
    </div>
  )
}
