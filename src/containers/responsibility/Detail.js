import { useParams, useHistory } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'

export default function Detail({ t }) {
  const { id } = useParams()
  const history = useHistory()

  function handleBack() {
    history.goBack()
  }

  const data = useFetch(`/home/Responsibility/detail?id=${id}`, {
    Detail: {},
  })
  const {
    title = '', create_time = '', content = '', summary,
  } = data.Detail

  return (
    <div className="news-detail-body">
      <div className="d-flex news-header">
        <div className="d-flex">
          <div className="header">
            <h2 className="t">{title}</h2>
            <span className="date">{create_time === undefined ? '' : create_time.slice(0, 10)}</span>
          </div>
          <button type="button" className="return" onClick={handleBack}>
            {t('returnlist')}
          </button>
        </div>
      </div>
      <div className="index-1">
        <div className="index-2" />
        <div className="index-content">{summary}</div>
        <div className="index-3" />
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
