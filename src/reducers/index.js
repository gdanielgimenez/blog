import {combineReducers} from 'redux';
import setBlogs from './setBlogs';
import editBlogs from './editBlogs';
import deleteBlogs from './deleteBlogs';

/*const allReducers = combineReducers({
    blogs: setBlogs,
    editBlogs:editBlogs,
    deleteBlogs:deleteBlogs
})

export default allReducers;*/

export default combineReducers({
    setBlogs:setBlogs
})