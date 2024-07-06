import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

const PostContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode");
  }, [darkMode]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("error fetching posts!");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      }
    };
    fetchPosts();
  }, []);

  const searchedPosts =
    query.length > 0
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        )
      : posts;

  const handleAddPost = async (title, content) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      // if (!res.ok) {
      //   throw new Error("error adding posts!");
      // }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setPosts([...posts, data]);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const handleDeletePost = async (title) => {
    try {
      const res = await fetch(`/api/posts/${title}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error deleting post!");
      }
      setPosts((posts) => posts.filter((post) => post.title !== title));
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        query,
        setQuery,
        onAddPost: handleAddPost,
        onDeletePost: handleDeletePost,
      }}
    >
      <section>
        <button
          className="btn-dark-mode"
          onClick={() => setDarkMode((darkMode) => !darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <Header />
        <Main />
        <Footer />
      </section>
      <Toaster />
    </PostContext.Provider>
  );
}

function Header() {
  const { posts, query, setQuery } = useContext(PostContext);
  return (
    <header>
      <h1>
        <span>🏛️</span>The Archaic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
      </div>
    </header>
  );
}

function SearchPosts() {
  const { query, setQuery } = useContext(PostContext);
  return (
    <input
      id="query"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { posts } = useContext(PostContext);
  return <p>📜 {posts.length} archaic posts found</p>;
}

function Main() {
  const { posts, onAddPost, onDeletePost } = useContext(PostContext);
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}

function Posts() {
  const { posts, onDeletePost } = useContext(PostContext);
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    await onAddPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={200}
        placeholder="Post content"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { posts, onDeletePost } = useContext(PostContext);
  return (
    <ul>
      {posts.map((post, ind) => (
        <li key={ind}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button
            className="del-btn hidden"
            onClick={() => onDeletePost(post.title)}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return <footer>&copy; by The Archaic Blog ✌️</footer>;
}

export default App;
