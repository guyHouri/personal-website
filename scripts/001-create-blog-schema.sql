-- Create the blog categories table for hierarchical structure
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  parent_id INTEGER REFERENCES blog_categories(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  -- IMPORTANT CHANGE: category_id now allows NULL and sets to NULL on category delete
  category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name VARCHAR(255) NOT NULL DEFAULT 'Guy Houri',
  author_email VARCHAR(255) NOT NULL DEFAULT 'guy.houri2024@gmail.com',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  reading_time INTEGER, -- in minutes
  tags TEXT[], -- PostgreSQL array for tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create the comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id SERIAL PRIMARY KEY,
  -- ON DELETE CASCADE is good here: deleting a post deletes its comments
  post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  -- ON DELETE CASCADE is good here: deleting a parent comment deletes its nested replies
  parent_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_categories_parent_id ON blog_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(approved);
