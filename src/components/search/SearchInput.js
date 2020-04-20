import './searchInput.scss'

export default function SearchInput() {
  return (
    <div className="big-search-input">
      <div className="d-flex ">
        <input placeholder="关键字查找" />
        <button type="button">搜索</button>
      </div>
    </div>
  )
}
