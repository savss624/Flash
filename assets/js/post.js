{
    let createPostMethod = function () {
        let postForm = $("#new-post");
        postForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                url: '/post/create',
                type: 'POST',
                data: postForm.serialize(),
                success: function(data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list").prepend(newPost);
                },
                error: function(err) {
                    console.log('error: ', err);
                }
            });
        });
    }

    let newPostDom = function(post) {
        return $(`<li id="post-${post._id}">
        <p>
            ${post.user.name}
            <br>
            <small>
                <a class="post-delete-anchor" href="/post/destroy/${post.id}">X</a>
            </small>
            ${post.content}
            <form action="/comment/create" id="new-comment" method="POST">
                <input type="text" placeholder="Comment Here..." name="comment" required>
                <input type="hidden" name="postId" value="${post._id}">
                <button type="submit" >Add Comment</button>
            </form>
            <ul>
                
            </ul>
        </p>
    </li>`);
    }

    createPostMethod();
}