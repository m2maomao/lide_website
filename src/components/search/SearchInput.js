import { useState } from 'react'
import './searchInput.scss'

function SearchInput({ search }) {
  const [inputValue, setInputValue] = useState('')


  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleClick() {
    search(inputValue)
  }

  return (
    <div className="big-search-input">
      <div className="d-flex ">
        <input placeholder="关键字查找" onChange={handleInputChange} />
        <button type="button" onClick={handleClick}>搜索</button>
      </div>
    </div>
  )
}
export default SearchInput
