import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { IPost } from "@libs/types";
import { usePagination } from "@libs/hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentCard from "@components/CommentCard";

export default function Home() {
  /* const [posts, setPosts] = useState<IPost[]>(null);

  const getPosts = async () => {
    const { data } = await axios.get("/posts?_sort=createdAt&_order=desc");
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);*/

  // const {
  //   data: posts,
  //   error,
  //   mutate,
  // } = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc");
  const {
    paginatedData,
    error,
    size,
    setSize,
    isReachedEnd,
    loadingMore,
    mutate,
  } = usePagination<IPost>("/posts?_sort=createdAt&_order=desc");

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost mutate={mutate} />

      <h4>Posts</h4>

      {error && <p>Something is wrong!</p>}

      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!isReachedEnd}
        loader={<Loader />}
        endMessage={<p>불러올 정보가 없습니다.</p>}
        dataLength={paginatedData?.length ?? 0}
      >
        {paginatedData?.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
