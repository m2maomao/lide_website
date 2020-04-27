import { useState } from 'react'
import './searchInput.scss'

function SearchInput({ search, keyword, searchbtnvalue }) {
  console.log('keyword:', keyword)
  console.log('searchbtnvalue:', searchbtnvalue)
  const [inputValue, setInputValue] = useState(keyword)
  const [btnValue, setsearchbtnvalue] = useState(searchbtnvalue === undefined ? '搜索' : searchbtnvalue)

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleClick() {
    search(inputValue)
  }

  return (
    <div className="big-search-input">
      <div className="d-flex ">
        <input placeholder="关键字查找" value={inputValue} onChange={handleInputChange} />
        <button type="button" onClick={handleClick}>{btnValue}</button>
      </div>
    </div>
  )
}
export default SearchInput
