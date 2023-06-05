<script>
  import { user, isLoggedIn } from "../store";
  import {onSnapshot,
    collection,} from 'firebase/firestore';
  import {db} from '../Firebase';
  import {onMount} from "svelte";

  
  let blogs=[];

  const fetchBlog = onSnapshot(collection(db, "blogs"), 
  (querySnapshot) => {
    blogs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id,
    }));
    console.log("entering into fetch function")
    console.log(blogs);
  },(err) => {
    console.log(err);
  })

  onMount(() => {
    console.log("on mount")
    fetchBlog();
  })

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
      <h4>{blog.title}</h4>
      <p>{blog.content}</p>
    {/each}
 </div>