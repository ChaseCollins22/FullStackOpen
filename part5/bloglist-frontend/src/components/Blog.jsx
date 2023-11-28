import { useState } from 'react';

function Blog({
  blog, updateBlog, deleteBlog, refreshBlogs, userId,
}) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes);

  const incrementLikes = async () => {
    setLikeCount(likeCount + 1);
    await updateBlog({
      ...blog,
      likes: likeCount + 1,
    });
  };

  const didIBreakThisShit = async () => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}?`)) {
      await deleteBlog(blog.id);
      refreshBlogs();
    }
  };

  return (
    <>
      {
      detailsVisible
        ? (
          <div className="blog">
            <span>
              Title:
              {blog.title}
            </span>
            <button className="hide-blog-btn" onClick={(e) => setDetailsVisible(!detailsVisible)}>Hide</button>
            <p>
              Author:
              {blog.author}
            </p>
            <span>
              Likes:
              {likeCount}
            </span>
            <button className="like-btn" onClick={incrementLikes}>Like</button>
            <p>
              URL:
              {blog.url}
            </p>
            { blog.user.id === userId && <button onClick={didIBreakThisShit}>Delete</button> }
          </div>
        )
        : (
          <div className="blog">
            {blog.title}
            {' '}
            {blog.author}
            <button className="view-blog-btn" onClick={(e) => setDetailsVisible(!detailsVisible)}>View</button>
          </div>
        )
      }
    </>

  );
}

export default Blog;
