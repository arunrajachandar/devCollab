import React from 'react';


export const template = ({
    path,
    vals,
    functions
}) =>{
    return (
<div className="post bg-white p-1 my-1" key={post._id}>
<div>
  <Link to={`/profile/${post.user}`}>
    <img
      className="round-img"
      src={post.avatar}
      alt=""
    />
  </Link>
  <h4>{post.name}</h4>
</div>
<div className="content m-1">
  <p className="my-1">
    {post.text}
    </p>
 <p className='post-date'>
Posted on <Moment format='LL'>{post.postedOn}</Moment>
 </p>
    <div className="addons">
        <button className="btn flex" onClick={(e)=> likeOrUnlikePost(post._id.toString())}>
<i className="fas fa-thumbs-up"></i>
{
post.likes.length > 0 && (
    <span className='inline'>{post.likes.length}</span>
)
}
        </button>
        <button className="btn flex" onClick={(e)=> likeOrUnlikePost(post._id.toString(), false)}>
            <i className="fas fa-thumbs-down"></i>
            {
post.unlikes.length > 0 && (
    <span className='inline'>{post.unlikes.length}</span>
)
}

        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary flex">
<span className='hide-sm'>Discussions</span>
{
post.comments.length > 0 && (
    <span className="comment-count">{post.comments.length}</span>
)
}
        </Link>
    {
        !auth.loading && post.user === auth.user._id && (
            <button className='btn btn-danger flex' onClick={()=> deletePost(post._id)}>
                <i className='fas fa-times' />
            </button>
        )
    }
    </div>
</div>

</div>


)
}

