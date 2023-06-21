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
    if($isEditable){
        updateBlog();
        $isEditable = false;
    }else{
        addBlog();
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
        console.log("new blog addded");
        goto("/");
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
    $currentBlogData.title = "";
    $currentBlogData.content = "";
    $currentBlogData.id = "";
    blog = { title: "" , content: "" };
    goto("/");
  }
  console.log($isEditable)
</script>

<div class="form-content container">
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
            <textarea 
            type="text"
            bind:value={blog.content}
            placeholder="Enter Content"
            class="input secondInp"
            />
        </div>
        <div class="buttons">
            <button>{#if $isEditable}Update{:else}Save{/if}</button>
        </div>
    </form>
      
   
</div>

<style>
.firstInp, .secondInp{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.secondInp{
    height: 60vh;
}
.buttons{
    text-align: center;
    padding: 10px 0px;
}
button {
    padding: 5px 5px;
}
</style>