import {  writable } from "svelte/store";

export const user = writable({
    displayName: "",
    photoURL:"",
    email:""
});

export const currentBlogData = writable({
    id:"",
    title:"",
    content:""
})

export const isLoggedIn = writable(false);
export const isEditable = writable(false);
export const showBlogId = writable(0);
