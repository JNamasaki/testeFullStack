<script lang="ts">
    import { getUserData } from "../firebase/firestore_message";
    import { currentUser } from "../firebase/auth";

    import type { message } from "../types/message";
    import { onMount } from "svelte";

    export let message: message;

    let messageImageUrl = "";

    onMount(async () => {
        if (
            $currentUser != null &&
            message.uid &&
            $currentUser.display_image_url != null
        ) {
            const userData = await getUserData(message.userId);

            messageImageUrl = userData?.display_image_url || "";
        }
    });
</script>

{#if $currentUser != null}
    <div class="message-container">
        {#if message.userId != $currentUser.uid && $currentUser.display_image_url != null}
            <img src={messageImageUrl} alt="user" />
        {/if}

        <div
            class="message-content"
            class:from-user={message.userId == currentUser.uid}
        >
            {message.content}
        </div>
    </div>
{/if}
