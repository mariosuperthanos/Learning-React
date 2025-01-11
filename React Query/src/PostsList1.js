// @ts-nocheck


import { useQueries, useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api/posts"

export default function PostsList1() {
  // /posts -> ["posts"]
  // /posts/id -> ["posts", id]
  // /posts?authorId=1 -> ["posts", { authorId: 1 }]

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  // const queries = useQueries({ queries: (postsQuery?.data ?? []).map(post => {
  //   return {
  //     queryKey: ["posts", post.id],
  //     queryFn: () => getPost(post.id),
  //   }
  // })})
  // console.log(queries.map(q => q.data));

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  console.log(postsQuery);

  return (
    <div>
      {/* <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post?.data?.id}>{post?.data?.title}</li>
        ))}
      </ol> */}
    </div>
  )
}