<script>
     import {db} from '../../Firebase';
     import {onSnapshot, doc} from 'firebase/firestore';
     import {showBlogId} from '../../store'
     import { parse } from "marked";
     
     let data =[];
    const docRef = doc(db, "blogs", $showBlogId);
    if($showBlogId != 0){
        onSnapshot(docRef, (doc) => {
            const temp = doc.data();
            temp.content = parse(temp.content);
            data = temp;
        })
       $showBlogId = 0;
    }
</script>

<div class="container">
    <div class="content">
        <h1>{data.title}</h1>
        <p>{@html data.content}</p>
    </div>
</div>

<style>
    h1{
        padding: 10px 0px;
        border-bottom: 1px dotted black;
        margin-bottom: 10px;
    }
    .content{
        padding: 20px 0px;  
    }
</style>
