<script>
  import { user, isLoggedIn, currentBlogData , isEditable} from "../store";
  import {onSnapshot,collection, deleteDoc, doc} from 'firebase/firestore';
  import {db} from '../Firebase';
  import {onMount} from "svelte";
  import { goto } from '$app/navigation';

  let blogs = [];
  const collRef = collection(db, "blogs");

  let deleteBlog = async (id) => {
    try{
      await deleteDoc(doc(db, "blogs", id));
    }catch(error) {
      alert("an error occured!!");
      console.log(error);
    }
  };

  const editData = (currentBlog) => {
     $currentBlogData.title = currentBlog.title;
     $currentBlogData.content = currentBlog.content;
     $currentBlogData.id = currentBlog.id;
     $isEditable = true;
     goto("/create");
    //goto(`/create?id=${currentBlog.id}`);
  };

  onMount(() => {
    console.log("on mount");
    onSnapshot(collRef, (querySnapshot) => {
    let fbBlogs = [];
    querySnapshot.forEach((doc) => {
      let blog = {...doc.data(), id:doc.id}
      fbBlogs = [blog, ...fbBlogs];
    })
    console.table(fbBlogs);
    blogs = fbBlogs;
  })
});
</script>

{#if $isLoggedIn}
 <div class="profile">
    <h4>Current Logged In user:</h4>
    <img src={$user.photoURL} alt="profile" />
    <p>Name :{$user.displayName}</p>
    <p>email: {$user.email}</p>
 </div>
 {/if}

 <div class="showBlogs">
    {#each blogs as blog}
    <div class="blog">
      <h4>{blog.title}</h4>
      <p>{blog.content}</p>
      <div class="buttons">
        <button on:click={editData(blog)}>Edit</button>
        <button on:click={deleteBlog(blog.id)} >Delete</button>
      </div>
    </div>
    {/each}
 </div>

 <style>
  .blog {
    padding: 10px 0px;
    border-bottom: 2px solid black;
  }
 </style>