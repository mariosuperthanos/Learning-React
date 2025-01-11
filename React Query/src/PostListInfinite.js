// @ts-nocheck

import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"

export function PostListInfinite() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam }) => getPostsPaginated(pageParam ?? 1),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  if (status === "pending") return <h1>Loading...</h1>
  if (error) return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>Post List Infinite</h1>
      {data.pages
        .flatMap(data => data.posts)
        .map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()} 
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  )
}