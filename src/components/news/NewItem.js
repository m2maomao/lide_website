import { Link } from 'react-router-dom'
import { getImage } from '@/assets/js/lib'

export default function NewItem({ data, index }) {
  const {
    title, image, MonthDay, Year, summary, id,
  } = data
  return (
    <li className="new-item">
      <Link to={`/news/${id}`} className="d-flex">
        <div className="date">
          <p className="m-d">{MonthDay}</p>
          <p className="y">{Year}</p>
        </div>
        <>
          {index % 2 !== 0 && (
            <div className="i-m-g">
              <img src={getImage(image)} alt="cover" />
            </div>
          )}
          <div className="c">
            <h3 className="c-t">{title}</h3>
            <p className="c-c">{summary}</p>
          </div>
          {index % 2 === 0 && (
            <div className="i-m-g">
              <img src={getImage(image)} alt="cover" />
            </div>
          )}
        </>
      </Link>
    </li>
  )
}
