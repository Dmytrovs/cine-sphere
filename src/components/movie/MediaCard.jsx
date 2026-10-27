import { Link } from "react-router";
import { tmdbApi } from "../../services/tmdb";
import style from "./MediaCard.module.css";

function MediaCard({ item, type }) {
  if (!item) return null;

  const title = item.title || item.name;

  const posterUrl = `${tmdbApi.IMAGE_BASE_URL}/w500${item.poster_path}`;

  return (
    <Link to={`/${type}/${item.id}`}>
      <div className={style.card || ""}>
        <img src={posterUrl} alt={title} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
}

export default MediaCard;
