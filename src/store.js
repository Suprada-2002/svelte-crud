import {  writable } from "svelte/store";

export const user = writable({
    displayName: "",
    photoURL:"",
    email:""
});
export const isLoggedIn = writable(false);
