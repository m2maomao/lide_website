import './wTitle.scss'

export default function WTitle({ title, enTitle }) {
  return (
    <div className="w-title-c">
      <h3 className="w-t">{title}</h3>
      <p className="e-t">{enTitle && enTitle.toUpperCase()}</p>
    </div>
  )
}
