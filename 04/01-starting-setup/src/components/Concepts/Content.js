const Content = ({ image, title, description}) => {
  return(
    // i used this in order to directly wrap the code without div
    <>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  )
}

export default Content;