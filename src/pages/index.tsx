import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import useSWR from "swr";
import axios from "axios";
import { IPost } from "@libs/types";

export default function Home() {
  /* const [posts, setPosts] = useState<IPost[]>(null);

  const getPosts = async () => {
    const { data } = await axios.get("/posts?_sort=createdAt&_order=desc");
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);*/

  const { data: posts, error } = useSWR<IPost[]>(
    "/posts?_sort=createdAt&_order=desc"
  );

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      {/*<CreatePost setPosts={setPosts} />*/}

      <h4>Posts</h4>

      {error && <p>Something is wrong!</p>}
      {!posts && <Loader />}
      {posts?.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  );
}
