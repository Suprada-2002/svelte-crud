<script>
  import "../Style.css";
  import {user, isLoggedIn} from '../store';
  import { auth } from "../Firebase";
  import { signOut } from "firebase/auth";

  const logout = async() => {
    signOut(auth). then(() => {
      $user.displayName = "";
      $user.photoURL = "";
      $user.email = "";
      $isLoggedIn = false;
      console.log("signed out succesfully");
    }).catch((error) => {
      console.log(error.message);
    })
  }
</script>

<nav class="container">
  <div class="header">
    <h1>Suprada's Blog</h1>
    <i>may include some other people too</i>
  </div>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="https://portfolio2-0-mu-nine.vercel.app/">Portfolio</a></li>
    {#if $isLoggedIn}
    <li><button class="button" on:click={logout}>Logout</button></li>
    <li><a href="/create">create</a></li>
    {:else}
    <li><a href="/login">Login</a></li>
    {/if}
  </ul>
</nav>
<slot />
<footer class="container">
    <p>Made with Svelte and Firebase</p>
</footer>

<style>

  .header{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  nav {
    display: grid;
    place-items: center;
    border-bottom: 1px solid black;
  }

   ul,p{
    margin: 0;
  }

  p{
    font-weight: 300;
  }

  ul{
    display: flex;
    list-style: none;
    margin: 0;
  }

  li{
    margin-right: 20px;
  }

  a{
    text-decoration: none;
  }

  footer{
    text-align: center;
    padding-top:30px;
    border-top: 1px solid black;
  }
</style>
