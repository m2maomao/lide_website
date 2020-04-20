import { useParams, useHistory } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'

export default function Detail() {
  const { id } = useParams()
  const history = useHistory()

  function handleBack() {
    history.goBack()
  }

  const data = useFetch(`/home/Responsibility/detail?id=${id}`, {
    Detail: {},
  })
  const { title = '', create_time = '', content = '' } = data.Detail

  return (
    <div className="news-detail-body">
      <div className="d-flex news-header">
        <div className="d-flex">
          <div className="header">
            <h2 className="t">{title}</h2>
            <span className="date">{create_time}</span>
          </div>
          <button type="button" className="return" onClick={handleBack}>
            返回列表
          </button>
        </div>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}
