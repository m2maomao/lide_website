import { useState, useRef, useEffect } from 'react'
import searchIcon from '@/assets/images/search.png'

import './searchButton.scss'

function SearchButton({ search }) {
  const [isSearch, toggleClass] = useState(false)

  const inputRef = useRef(null)

  // useEffect(() => {
  //   if (isSearch) {
  //     inputRef.current.focus()
  //   }
  // }, [isSearch])

  const [inputValue, setInputValue] = useState('')

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleClick() {
    search(inputValue)
  }

  return (
    <div className={`d-flex search ${isSearch ? 'search-input-show' : ''}`}>
      <img
        className={`search-icon ${isSearch ? 'search-icon-hidden' : ''}`}
        src={searchIcon}
        alt="search"
        onClick={() => toggleClass(true)}
      />
      <div className={`search-input ${isSearch ? 'search-input-show' : ''}`}>
        <input ref={inputRef} onBlur={() => toggleClass(false)} onChange={handleInputChange} />
        <img src={searchIcon} alt="search" onClick={handleClick} />
      </div>
    </div>
  )
}

export default SearchButton
