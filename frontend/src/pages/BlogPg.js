import { useLocation } from 'react-router-dom';
import Blog from '../components/blog/Blog.js';
import './BlogPg.css';

export default function BlogPg() {
    const location = useLocation();
    const blog = location.state.blog;

    return (
        <div className='blogPg'>
            {blog ? <Blog blog={blog} /> : <p>Loading...</p>}
        </div>
    );
}
