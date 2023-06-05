<script>
  import { user, isLoggedIn } from "../store";
  import {onSnapshot,
    collection,
    getDocs} from 'firebase/firestore';
  import {db} from '../Firebase';
  import {onMount} from "svelte";

  let blogs = [];
  const collRef = collection(db, "blogs");

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
    </div>
    {/each}
 </div>

 <style>
  .blog {
    padding: 10px 0px;
    border-bottom: 2px solid black;
  }
 </style>