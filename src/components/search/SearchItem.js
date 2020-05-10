import { useHistory } from 'react-router-dom'

import './searchItem.scss'

export default function SearchItem({
  title, create_time, firstColumn, secondColumn, id, t,
}) {
  const history = useHistory()

  // 判断进入各个二级栏目/详情页
  function handleClick(fc, sc, id) {
    // console.log('fc', fc, 'sc', sc, 'id', id)
    switch (fc) {
      case 'News':
        history.push(`/news/${id}`)
        break
      case 'Welcome':
        history.push('/welcome/magazine')
        break
      case 'Product':
        history.push(`/products/${id}`)
        break
      case 'Duty':
        if (sc === 'Info') {
          history.push(`/responsibility/${sc}/${id}`)
        } else {
          history.push(`/responsibility/${sc}/${id}`)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="d-flex search-item" onClick={() => handleClick(firstColumn, secondColumn, id)}>
      <div className="content">
        <h3 className="title">{title}</h3>
        <span className="date">{create_time}</span>
      </div>
      <div className="link">
        <i className="read-more-icon" />
        <button type="button" className="read-more-link">
          {t('readdetail')}
        </button>
      </div>
    </div>
  )
}
