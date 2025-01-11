// @ts-nocheck


import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useState } from "react"
import { getPostsPaginated } from "./api/posts"

export function PostListPaginated() {
  const [page, setPage] = useState(1)

  const { status, error, data, isPlaceholderData } = useQuery({
    queryKey: ["posts", { page }],
    placeholderData: keepPreviousData,
    queryFn: () => getPostsPaginated(page),
  })

  console.log({ isPlaceholderData });

  if (status === "pending") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPlaceholderData && "Previous Data"}</small>
      </h1>
      {data.posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}{" "}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  )
}