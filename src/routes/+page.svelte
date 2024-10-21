<script>
    import { goto } from "$app/navigation";
    import { signOut } from "firebase/auth";
    import { get } from "svelte/store";
    import {
        authState,
        currentUser,
        logout,
        userChange,
    } from "../firebase/auth";
    import { onMount } from "svelte";
    // import { data } from "../routes/login";
    let user = get(currentUser);

    // if (!user) {
    //     goto("/login");
    // }

    onMount(() => {
       
    });

    async function handleLogout() {
        await logout();
        goto("/login");
    }
    let contacts = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Carol" },
    ];

    let selectedContact = null;

    function selectContact(contact) {
        selectedContact = contact;
        goto(`/conversa/${contact.name}`);
    }
</script>

<div class="container">
    <!-- Lista de contatos -->

    <div class="contacts">
        {#each contacts as contact}
            <div class="contact" on:click={() => selectContact(contact)}>
                {contact.name}
            </div>
        {/each}

        <button on:click={handleLogout}>Logout</button>
    </div>

</div>

<style>
    .container {
        display: flex;
        height: 100vh;
    }

    .contacts {
        width: 25%;
        background-color: #f4f4f4;
        padding: 10px;
        border-right: 1px solid #ccc;
        overflow-y: auto;
    }

    .contact {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
    }

    .contact:hover {
        background-color: #ddd;
    }

    .chat {
        width: 75%;
        padding: 10px;
    }

    .chat-box {
        border: 1px solid #ccc;
        padding: 10px;
        height: 80%;
        overflow-y: auto;
    }

    .input-box {
        margin-top: 10px;
    }
</style>
