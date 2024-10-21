<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "firebase/auth";
  import type { FirestoreUser } from "../../types/firestore_user";
  import { writable } from "svelte/store";
  import { authState, signInGoogle, userChange } from "../../firebase/auth";
  import { goto } from "$app/navigation";

  export let data: {
    auth: {
      signInGoogle: () => Promise<void>;
      authState: User | null;
    };
    firestore: {
      currentUser: FirestoreUser | null;
    };
  };

  let currentUser = writable<FirestoreUser | null>(
    data.firestore?.currentUser ?? null,
  );

  onMount(() => {
    
    signInGoogle();

    const unsubscribe = authState.subscribe((user: User | null) => {
      if (user) {
        userChange(user).then(() => {
          currentUser.set(user);
  
          goto("/");
        });
      } else {
        currentUser.set(null);
      }
    });

    return () => unsubscribe();
  });

  async function handleClick() {
    try {
      loggingIn = true;
      await signInGoogle();
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      loggingIn = false;
    }
  }
  let loggingIn = false;
</script>

{#if $authState == null}
  <main class="center">
    <button on:click={handleClick} disabled={loggingIn}>
      Log In With Google
    </button>
  </main>
{:else if $currentUser == null}
  <main class="center">
    <span>Loading User Data...</span>
  </main>
{/if}
