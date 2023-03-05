import { useRef } from "react";

function Form(props) {
    const searchData = useRef(null);
  
    function handleSearch(e) {
      e.preventDefault();
      props.onSearch(searchData.current);
    }
  
    return (
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          name="searchValue"
          placeholder="Search.."
          onChange={(e) => {
            searchData.current = e.target.value;
          }}
        />
        <button className="search-btn" type="submit">
          <svg height="32px" width="32px">
            <path
              d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
              fill="#ffffff"
            />
          </svg>
        </button>
      </form>
    );
  }
  
export default Form