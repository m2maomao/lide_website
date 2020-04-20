import './side.scss'

export default function Side({ title, children }) {
  return (
    <aside className="aside">
      <div className="aside-header">
        <h2 className="sc-m aside-title">{title}</h2>
      </div>
      <div>{children}</div>
    </aside>
  )
}
