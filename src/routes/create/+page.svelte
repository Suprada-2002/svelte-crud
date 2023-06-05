<script>
    import {db} from '../../Firebase';
    import {
    onSnapshot,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    QuerySnapshot,
  } from "firebase/firestore";
  import { onMount } from 'svelte';

  let blog = {
    title: "",
    content: ""
  };

  let elementInput;
  let editStatus = false;
  let currentId = "";

  let handleSubmit = () => {
    if(!blog.title) {
        alert("add a title !!");
        return;
    }

    // if(!editStatus){
    //     addBlog();
    // }else{
    //     updateBlog();
    //     editStatus = false;
    // }
    blog = { title: "" , content: "" };
    //inputElement.focus();
  };

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
  let updateBlog = () => {};

</script>

<div class="form-content">
    <form on:submit|preventDefault={handleSubmit} >
        <div class="firstInp">
            <label for="title">Title</label>
            <input 
            type="text"
            bind:value={blog.title}
            placeholder="Enter the title for your blog"
            class="input firstInp"
            />
       </div>
       <div class="secondInp">
            <label for="content">Content</label>
            <input 
            type="text"
            bind:value={blog.content}
            placeholder="Enter Content"
            class="input secondInp"
            />
        </div>
        <div class="button">
            <button on:click={addBlog} >Save</button>
        </div>
    </form>
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