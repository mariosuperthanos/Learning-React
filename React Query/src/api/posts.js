import axios from "axios"

export async function getPosts() {
  try {
    const res = await axios.get("http://localhost:3000/posts", { params: { _sort: "title" } });
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Poți arunca eroarea mai departe sau o poți gestiona cum dorești
  }
}


export function getPostsPaginated(page) {
  return axios
    .get("http://localhost:3000/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then(res => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      }
    })
}

export async function getPost(id) {
  try {
    const res = await axios.get(`http://localhost:3000/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Poți arunca eroarea mai departe sau o poți gestiona cum dorești
  }
}


export function createPost({ title, body }) {
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
      userId: 1,
      id: Date.now(),
    })
    .then(res => res.data)
}