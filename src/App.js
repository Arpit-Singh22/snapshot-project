import { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';
import Form from './components/Form';
import NavButton from './components/NavButton';
import FlickrImage from './components/Image';

function App() {
  const predefinedValue = ['mountains', "beaches", "birds", "food"]
  const api_key = "ed36cc086b0946530872c6674cbd1e88";
  const [image, setImage] = useState([]);
  const [searchText, setSearchText] = useState("mountains");

  function fetchFlickrImageUrl(photo) {
    let farm = photo.farm;
    let server = photo.server;
    let id = photo.id;
    let secret = photo.secret;
    let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;

    return url;
  }

  function handleSearch(query) {
    setSearchText(query);
  }

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
  return <div className='App'>
    <h1 className='header'>SnapShot</h1>
    <Form handleSearch={handleSearch} />
    <section className='nav-button'>
      {predefinedValue.map((value) => (
        <NavButton
          key={value}
          label={value}
          onClick={(value) => setSearchText(value)}
        />
      ))}
    </section>
    <section className='image-container'>
      {image.map((imageUrl, index) => (
        <FlickrImage key={index} url={imageUrl} />
      ))}
    </section>
  </div>
}

export default App