import { useEffect, useState, useRef } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const api_key = 'ed36cc086b0946530872c6674cbd1e88'
  const searchData = useRef(null);
  const [image, setImage] = useState([])
  const [searchText, setSearchText] = useState('mountains')
  const fetchFlickrImageUrl = (photo) => {
    let farm = photo.farm;
    let server = photo.server;
    let id = photo.id;
    let secret = photo.secret;
    let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`
  
    return url

  }
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: api_key,
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    const parameters = new URLSearchParams(params)
    const url = `https://api.flickr.com/services/rest/?${parameters})`

    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        const Imagearr = response.data.photos.photo.map((imgData) => {
          return fetchFlickrImageUrl(imgData)
          // console.log(imgData);
        })
        setImage(Imagearr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [searchText])


  return <div className='App'>
    <h1 className='header'>SnapShot</h1>
    <section className='form'>
      <input
        type='text'
        name='searchValue'
        placeholder='Search..'
        onChange={(e) => { searchData.current = e.target.value }}
      />
      <button className='search-btn'
        onClick={() => setSearchText(searchData.current)}
      >
        <svg height='32px' width='32px'>
          <path
            d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
            fill="#ffffff"
          />
        </svg>
      </button>
    </section>

    <section className='nav-button'>
      <button onClick={() => { setSearchText("mountains") }}>Mountains</button>
      <button onClick={() => { setSearchText("beaches") }}>Beaches</button>
      <button onClick={() => { setSearchText("birds") }}>Birds</button>
      <button onClick={() => { setSearchText("food") }}>Food</button>
    </section>
    <section className='image-container'>

      {image.map((imageurl, key) => {
        return (
          <article className='flickr-image'>
            <img src={imageurl} key={key} alt='' />
          </article>
        )

      })}

    </section>
  </div>

}

export default App;

useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: api_key,
      text: searchText,
      sort: "",
      per_page: 40,
      license: "4",
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1,
    };
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`;

    axios
      .get(url)
      .then((response) => {
        const Imagearr = response.data.photos.photo.map((imgData) => {
          return fetchFlickrImageUrl(imgData);
        });
        setImage(Imagearr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText])