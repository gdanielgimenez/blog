import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

function BlogPage(){
 const blogs = useSelector(state =>state.setBlogs.blogs);
 const {blog} = useParams();
 const currentBlog = blogs.filter(blogg =>(blogg.id ) == blog)
    return(
        <div>
            <h1>{currentBlog[0].title}</h1>
            <p>
                {currentBlog[0].body}
            </p>
            <Link to="/Home">back to Home</Link>
        </div>
    )
}

export default BlogPage;
