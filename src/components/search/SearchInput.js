import { useState } from 'react'
import './searchInput.scss'

function SearchInput({
  search, keyword, searchbtnvalue, t,
}) {
  console.log('keyword:', keyword)
  console.log('searchbtnvalue:', searchbtnvalue)
  const [inputValue, setInputValue] = useState(keyword)
  const [btnValue, setsearchbtnvalue] = useState(searchbtnvalue === undefined ? t('search') : searchbtnvalue)

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleClick() {
    console.log('inputValue:', inputValue)

    search(inputValue === '' ? undefined : inputValue)
  }

  function keyDownHandle(e) {
    if (e.keyCode === 13) {
      search(inputValue === '' ? undefined : inputValue)
    }
  }

  return (
    <div className="big-search-input">
      <div className="d-flex ">
        <input placeholder={t('keywordsearch')} value={inputValue} onChange={handleInputChange} onKeyDown={keyDownHandle} />
        <button type="button" onClick={handleClick}>{btnValue}</button>
      </div>
    </div>
  )
}
export default SearchInput
