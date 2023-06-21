<script>
  import { user, isLoggedIn, currentBlogData , isEditable, showBlogId} from "../store";
  import {onSnapshot,collection, deleteDoc, doc} from 'firebase/firestore';
  import {db} from '../Firebase';
  import {onMount} from "svelte";
  import { goto } from '$app/navigation';

  let blogs = [];
  const collRef = collection(db, "blogs");

  //show Blog on full Display
  let showFullBlog = (blogId) => {
    $showBlogId = blogId;
    goto("/showBlog");
  }

  //deleting blog
  let deleteBlog = async (id) => {
    try{
      await deleteDoc(doc(db, "blogs", id));
    }catch(error) {
      alert("an error occured!!");
      console.log(error);
    }
  };

  //send data to edit data
  const editData = (currentBlog) => {
     $currentBlogData.title = currentBlog.title;
     $currentBlogData.content = currentBlog.content;
     $currentBlogData.id = currentBlog.id;
     $isEditable = true;
     goto("/create");
    //goto(`/create?id=${currentBlog.id}`);
  };

  onMount(() => {
    //console.log("on mount");
    onSnapshot(collRef, (querySnapshot) => {
    let fbBlogs = [];
    querySnapshot.forEach((doc) => {
      let blog = {...doc.data(), id:doc.id}
      fbBlogs = [blog, ...fbBlogs];
    })
    //console.table(fbBlogs);
    blogs = fbBlogs;
  })
});
</script>

<div class="mainpage container">
 <div class="showBlogs">
    {#each blogs as blog}
    <div class="blog">
      <h4
       on:click={showFullBlog(blog.id)}
      >{blog.title}</h4>
      {#if $isLoggedIn}
      <div class="buttons">
        <button class="button" on:click={editData(blog)}>Edit</button>
        <button class="button" on:click={deleteBlog(blog.id)} >Delete</button>
      </div>
      {/if}
    </div>
    {/each}
 </div>
</div>

 <style>
  .blog {
    padding: 10px 0px;
  }

  h4{
    color: rgb(75, 11, 75);
    cursor:pointer;
  }

  .buttons{
    padding-top: 10px;
  }
  .button{
    padding: 3px 5px;
    cursor: pointer;
  }
 </style>