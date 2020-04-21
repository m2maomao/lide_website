import { useHistory } from 'react-router-dom'

import './searchItem.scss'

export default function SearchItem({
  title, create_time, firstColumn, secondColumn, id,
}) {
  const history = useHistory()

  // 判断进入各个二级栏目/详情页
  function handleClick(fc, sc, id) {
    // console.log('fc', fc, 'sc', sc, 'id', id)
    if (fc === 'News') {
      history.push(`/news/${id}`)
    }
  }

  return (
    <div className="d-flex search-item">
      <div className="content">
        <h3 className="title">{title}</h3>
        <span className="date">{create_time}</span>
      </div>
      <div className="link">
        <i className="read-more-icon" />
        <button type="button" onClick={() => handleClick(firstColumn, secondColumn, id)} className="read-more-link">
          阅读详情
        </button>
      </div>
    </div>
  )
}
