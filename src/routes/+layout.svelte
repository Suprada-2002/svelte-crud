<script>
  import "../Style.css";
  import {user, isLoggedIn} from '../store';
  import { auth } from "../Firebase";
  import { signOut } from "firebase/auth";

  const logout = async() => {
    signOut(auth). then(() => {
      $isLoggedIn = false;
      $user.displayName = "";
      $user.photoURL = "";
      $user.email = "";
      console.log("signed out succesfully");
    }).catch((error) => {
      console.log(error.message);
    })
  }
</script>

<nav>
  <h5>Blog App</h5>
  <ul>
    <li><a href="/">Home</a></li>
    {#if $isLoggedIn}
    <li><button on:click={logout}>Logout</button></li>
    {:else}
    <li><a href="/login">Login</a></li>
    {/if}
    <li><a href="/create">create</a></li>
  </ul>
</nav>
<slot />
<footer>
    <h3>Made with Svelte and Firebase ,feat Vim</h3>
</footer>

<style>
  h5, ul{
    margin: 0;
  }

  ul{
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li{
    margin-right: 20px;
  }

  a{
    text-decoration: none;
  }
</style>
