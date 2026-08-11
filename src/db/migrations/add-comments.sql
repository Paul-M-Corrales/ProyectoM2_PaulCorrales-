CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_comments_post
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_comments_author
    FOREIGN KEY (author_id)
    REFERENCES authors(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_post_id
ON comments(post_id);

CREATE INDEX IF NOT EXISTS idx_comments_author_id
ON comments(author_id);