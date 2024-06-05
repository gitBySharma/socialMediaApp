const submitBtn = document.getElementById("submitBtn");

const link = document.getElementById("postLink");
const description = document.getElementById("postDesc");

const serverUrl = "http://localhost:3000";

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const postDetails = {
        postLink: link.value,
        postDesc: description.value
    }

    //saves the entered data into the database
    axios.post(serverUrl, postDetails)
        .then((result) => {
            console.log(result);
            displayPost(result.data.postData);
        }).catch((err) => {
            console.log(err);
        });

    //clears the inout fields
    link.value = "";
    description.value = "";
});


//function to display data on dashboard
function displayPost(postDetails) {
    const posts = document.getElementById("posts");

    const postDiv = document.createElement("div");  //div element for the posts
    postDiv.classList.add("col-md-6", "post-container"); // Added Bootstrap grid and custom class

    //creating an image element
    const img = document.createElement("img");
    img.src = postDetails.postLink;
    img.alt = "Post Image";
    img.classList.add("post-image"); // Added custom class

    //a div element to display the description
    const desc = document.createElement("div");
    desc.classList.add("post-description"); // Added custom class

    //creating span element for User and description
    const userLabel = document.createElement("span");
    userLabel.innerText = "User - ";

    const postText = document.createElement("span");
    postText.innerText = postDetails.postDesc;

    desc.appendChild(userLabel);
    desc.appendChild(postText);

    //creating the comment button
    const comment = document.createElement('button');
    comment.innerText = "Comment";
    comment.classList.add("btn", "btn-primary","btn-sm", "mt-3"); // Added Bootstrap button classes

    //function to handle comment button functionality
    comment.addEventListener('click', (event) => {
        event.preventDefault();
        const commentSection = document.createElement("div");  //creating another div for the comment section

        const commentInput = document.createElement("input");  //input box to add a comment
        commentInput.type = "text";
        commentInput.id = "cmntInput";
        commentInput.placeholder = "Enter your comment....";
        commentInput.classList.add("form-control","comment-input")

        const saveBtn = document.createElement("button");  //creating a button to save the comment
        saveBtn.innerText = "Save";
        saveBtn.id = "saveBtn";
        saveBtn.classList.add("btn","btn-sm", "btn-outline-success"); // Added custom class for save button

        const currentPostId = postDetails.id || Math.floor(Math.random() * 1000000);  //associating an id for each post (assigns a random number in case of new posts without comments)

        //handles the save button functionality
        saveBtn.addEventListener('click', () => {
            const comment = {
                comment: `Anonymous: ${commentInput.value}`,
                postId: currentPostId  //added the postId to associate comments with its corresponding post
            }
            //console.log(currentPostId);
            axios.post(`${serverUrl}/comments`, comment)  //post request to save the comment into database
                .then((result) => {
                    console.log(result.data.commentData.comment);

                    const newComment = document.createElement('p');
                    newComment.innerText = result.data.commentData.comment;
                    commentSection.appendChild(newComment);

                    commentInput.value = "";
                })
                .catch((err) => {
                    console.log(err);
                });

        });

        commentSection.appendChild(commentInput);
        commentSection.appendChild(saveBtn);


        axios.get(`${serverUrl}/comments/${currentPostId}`)  //get request for comments to load on page reload (visible after clicking the comment button)
            .then((result) => {
                if (result.data.commentData) {
                    result.data.commentData.forEach(comment => {
                        const existingComment = document.createElement("p");
                        existingComment.innerText = comment.comment;
                        commentSection.appendChild(existingComment);
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })

        postDiv.appendChild(commentSection);

    });

    postDiv.appendChild(img);
    postDiv.appendChild(desc);
    postDiv.appendChild(comment);

    posts.appendChild(postDiv);
}

//function to retrieve and display data on dashboard on page reload
document.addEventListener('DOMContentLoaded', () => {
    axios.get(serverUrl)
        .then((result) => {
            console.log(result);
            if (result.data.postData) {
                result.data.postData.forEach(post => {
                    displayPost(post);
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
})