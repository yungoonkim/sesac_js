import { useState, useEffect } from "react";
import { fetchPosts } from "../api/UsersApi";
const MAXCOUNT = 20;

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPosts()
            .then(data => {
                setPosts(data);
            })
    }, []);

    // 전체 페이지 수
    const totalPages = Math.max(1, Math.ceil(posts.length / MAXCOUNT));

    // 현재 페이지 데이터 계산
    const startIndex = (page - 1) * MAXCOUNT;
    const endIndex = page * MAXCOUNT;
    const currentPosts = posts.slice(startIndex, endIndex);


    return(
        <div>
            <h1>Posts</h1>

            <ul>
                {currentPosts.map(p => (
                    <li key={p.id}>
                        <h3>{p.title}</h3>
                        <p>{p.body}</p>
                    </li>
                ))}
            </ul>

            {/* 페이지 버튼 */}
            <div>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}