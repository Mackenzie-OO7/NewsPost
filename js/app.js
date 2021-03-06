//FETCH Posts
let latestPostWrapper = document.querySelector("#latest-news");
let latestBox = [];
const url ="https://jsonplaceholder.typicode.com/posts";

latestPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        latestBox = data;
        latestBox = latestBox.slice(0, 10);
        latestUI(latestBox) ;
    })
    
}
latestPosts();

//DELETE Posts
function latestUI (postsUI) {
    let latestPostHolder = "";
      

        postsUI.forEach(latestPost => {
            let wordLength = latestPost.body;
            wordLength = wordLength.slice(0, 90);

            let titleLength = latestPost.title;
            titleLength = titleLength.slice(0, 30);

            latestPostHolder += `
            <div class=" mb-5 mx-auto col-lg-5 col-md-12">
            <div class="card-body">
                <div class="img-post">
                    <img src="img/post${latestPost.id}.jpg" alt="image" style="border-radius:15px; height: 33vmax !important;" class="img-fluid w-100 post-images">
                </div>
                <h5 class="latestcard-title pt-2 pb-2 fw-bold">${titleLength}</h5>
                <p class="latestcard-body">${wordLength}</p>
                <div class="btn-div d-flex justify-content-between ">
                    <button onclick="updatelatestPost(${latestPost.id})" class="btn btn-dark" href="#form-section"><i class="bi bi-pencil mx-1"></i>Update</button>
                    <button class="btn btn-warning btn-outline-dark ms-3" onclick="viewlatestPost(${latestPost.id})"><i class="bi bi-book mx-1"></i>View</button>
                    <button class="btn btn-danger btn-outline-light ms-3" onclick="deletelatestPost(${latestPost.id})"><i class="bi bi-trash mx-1"></i>Delete</button>
                </div>
            </div>
        </div>
            `
        })
    latestPostWrapper.innerHTML = latestPostHolder;
}

function deletelatestPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            latestBox = latestBox.filter(latestPost => latestPost.id !== id)
            latestUI(latestBox) ;
        })

}

// VIEW Posts

function viewlatestPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'nextpage.html';
            // console.log(data)
        });
}


   

// UPDATE Posts
function updatelatestPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            // console.log(data)
            let postTitles = document.querySelectorAll('.latestCard-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.latestCard-body')
            // console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })
     });
}


// CREATE Posts
let postForm = document.querySelector("#create-post");
let title = document.querySelector("#post-title");
let body = document.querySelector("#post-body");
let latestPostBox = [];

postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            latestPostBox.unshift(data);
            let latestPostHolder = '';
            latestPostBox.forEach(post => {
                latestPostHolder += `
                    <div class="col-lg-4 col-md-6 mb-5">
                        <div class="card-body">
                            <div class="img-post">
                                <img src="img/post${post.id}.jpg" alt="image" style="border-radius:15px; height: 33vmax !important;" class="img-fluid w-100 post-images">
                            </div>
                            <h5 class="card-title pt-2 pb-2  fw-bold">${post.title}</h5>
                            <p class="card-body">${post.body}</p>
                            <div class="btn-div d-flex justify-content-between ">
                                <button onclick="updatePost(${post.id})" class="btn btn-dark" href="#form-section"><i class="bi bi-pencil mx-1"></i> Update</button>
                                <button class="btn btn-warning btn-outline-dark ms-3" onclick="view(${post.id})"> <i class="bi bi-book mx-1"></i>View</button>
                                <button class="btn btn-danger btn-outline-dark ms-3" onclick="deletePost(${post.id})"><i class="bi bi-trash mx-1"></i>Delete</button>
                            </div>
                       </div>
                 </div>
                `
            });
        latestPostWrapper.innerHTML = latestPostHolder;
    })
}
