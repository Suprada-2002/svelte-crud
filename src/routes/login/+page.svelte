<script>
    import { auth, googleAuthProvider } from "../../Firebase";
    import { signInWithPopup } from "firebase/auth";
    import {user, isLoggedIn} from '../../store';
    import { goto } from "$app/navigation";

    const login = async () => {
      await signInWithPopup(auth, googleAuthProvider).then((res) => {
        $user.displayName = res.user.displayName ? res.user.displayName : "";
        $user.photoURL = res.user.photoURL ? res.user.photoURL : "";
        $user.email = res.user.email ? res.user.email : "";
        $isLoggedIn = true;
        goto("/");
        console.log(res.user);
      }).catch((error) => {
        console.log(error.code, error.message);
      })
       
    }
</script>

<div class="container">
<h1>login </h1>

{#if $isLoggedIn}
 <div class="profile">
    <h4>Current Logged In user:</h4>
    <img src={$user.photoURL} alt="my profile" />
    <p>Name :{$user.displayName}</p>
    <p>email: {$user.email}</p>
    <button>Logout</button>
 </div>
 {:else}
 <button on:click={login}>Login Using Google</button>
 {/if}
</div>

<style>
  .container {
    display: grid;
    place-items: center;
  }

  button {
    padding: 5px 5px;
    margin: 10px 0px;
  }

</style>