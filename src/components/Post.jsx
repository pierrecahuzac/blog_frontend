import { Link } from "react-router-dom";

import "../assets/CSS/post.scss";

export default function Post({
  id,
  title,
  filename,
  picture,
  content,
  createdAt,
  username,
  articleId,
}) {
  const date = new Date(createdAt);

  const newDate = date.toLocaleString("fr-FR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="post"
      key={id}
      id={id}
      onClick={(e) => {
        const articleId = e.target.title;
      }}
    >
      <Link to={`/blog/${id}`}>
        <div className="post_image_container">
          <img
            src={picture}
            alt={filename}
            className="post_picture"
            key={picture}
          />
        </div>
        <div className="post_info">
          <header className="post_header">
            <h2 className="post_header_title">{title}</h2>
          </header>
          <main className="post_body">
            <p className="post_content">{content}</p>
          </main>
          <footer className="post_footer">
            <p className="post_date">{newDate}</p>
            <p className="post_author">{username}</p>
          </footer>
        </div>
      </Link>
      {/*   <Link to={`/blog/user/${username}`}> */}

      {/*  </Link> */}
    </article>
  );
}
