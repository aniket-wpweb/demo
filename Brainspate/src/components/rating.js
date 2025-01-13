const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>);
  }

  if (hasHalfStar) {
    stars.push(
      <i
        key={fullStars}
        className="fa fa-star-half"
        // style={{ marginRight: "0.5rem" }}
      ></i>
    );
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
