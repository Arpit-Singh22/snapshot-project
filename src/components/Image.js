function FlickrImage(props) {
  console.log(props);
  return (
    <article className="flickr-image">
      <ul>
        <li> <img src={props.url} alt="" /></li>
      </ul>
    </article>
  );
}

export default FlickrImage