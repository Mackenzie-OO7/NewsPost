
    function viewlatestPost() {
        let newPost = localStorage.getItem('viewedPost')
        console.log(newPost);
        let post = JSON.parse(newObject)
        console.log(post.title)
        document.getElementById('card-title').innerHTML = post.title;
        document.getElementById('view-post').src = '.img/post${post.id}.jpg';
        document.getElementById('card-body').innerHTML = post.body;
        document.getElementById('card-title2').innerHTML = post.title;
    }
    viewlatestPost();