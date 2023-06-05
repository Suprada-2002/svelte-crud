<script>
    import {db} from '../../Firebase';
    import {currentBlogData, isEditable} from '../../store'
    import {
    collection,
    addDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { goto } from '$app/navigation';

  let blog = {
    id:"",
    title: "",
    content: ""
  };
  blog.id = $currentBlogData.id;
  blog.title = $currentBlogData.title;
  blog.content = $currentBlogData.content;

  let handleSubmit = () => {
    if(blog.title === "") {
        alert("add a title !!");
        return;
    }else if(blog.content === ""){
        alert("add some content !!");
        return;
    }
    blog = { title: "" , content: "" };
  };

  //adding new blog
  let addBlog = async() => {
    try{
        await addDoc(collection(db, "blogs"), {
            ...blog,
            createdAt: Date.now(),
        });
        console.log("new blog addded")
    }catch(error){
            console.log(error)
        }
  };

  //updating blog data
  const updateBlog = async() => {
    try{
        await updateDoc(doc(db, "blogs", blog.id), blog);
    }catch(error){
        console.log(error);
    }

    $isEditable = false;
    $currentBlogData.title = "";
    $currentBlogData.content = "";
    $currentBlogData.id = "";
    blog = { title: "" , content: "" };
    goto("/");
  }
</script>

<div class="form-content">
    <form on:submit|preventDefault={handleSubmit} >
        <div class="firstInp">
            <label for="title" id="title" >Title</label>
            <input 
            type="text"
            bind:value={blog.title}
            placeholder="Enter the title for your blog"
            class="input firstInp"
            />
       </div>
       <div class="secondInp">
            <label for="content" id="content" >Content</label>
            <input 
            type="text"
            bind:value={blog.content}
            placeholder="Enter Content"
            class="input secondInp"
            />
        </div>
    </form>
        <div class="button">
            {#if isEditable}
            <button on:click={updateBlog} >update</button>
            {:else}
            <button on:click={addBlog} >Save</button>
            {/if}
        </div>
   
</div>



<style>
    /* .form-content{
        display: grid;
        place-items:center;
    }
    form{
        display: flex;
        flex-direction: column;
    } */
    .input{
        width: 50%;
    }

    .secondInp{
        height: 300px;
    }

</style>