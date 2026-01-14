import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPostById, commentsPostById } from "../api/UsersApi";


export default function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPostById(postId)
            .then(data => {
                setPost(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [postId]);

    useEffect(() => {
        commentsPostById(postId)
            .then(data => {
                setComments(data);
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [postId]);

    if (!post || !comments.length === 0) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h1 style={{ margin: 0 }}>Post #{postId}</h1>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => navigate(-1)}>뒤로</button>
                    <Link to="/posts">목록으로</Link>
                </div>
            </div>
            <h3>{post.title}</h3>
            <p>UserId: {post.userId}</p><hr />
            <p>{post.body}</p><hr />
            <div>
                <h2>Comments({comments.length})</h2>
                <ul>
                    {comments.map((c) => (
                        <li key={c.id}>
                            <h3>{c.name}</h3>
                            <p>{c.email}</p>
                            <p>{c.body}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}