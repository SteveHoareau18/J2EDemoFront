<script lang="ts">
  import { onMount } from "svelte";
  import type { SvelteComponent } from "svelte";
  import Home from "./lib/Home.svelte";
  import UserManagement from "./lib/UserManagement.svelte";
  import type { Page } from "./entity/Page";

  let currentPage: typeof SvelteComponent<any, any, any>;
  let pages: Record<string, Page> = {
    __Home: {
      name: "Accueil",
      svelteFile: Home,
    },
    __UserManagement: {
      name: "Gestion des utilisateurs",
      svelteFile: UserManagement,
    },
  };

  const active = async (page: string) => {
    currentPage = pages[page].svelteFile;
  };

  onMount(() => {
    active("__Home");
  });
</script>

<main>
  <div class="body text-center">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a
          href="/index"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >GestCom!</span
          >
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            {#each Object.entries(pages) as [page, details]}
              <li>
                <button
                  class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                  on:click|preventDefault={() => active(page)}
                  >{details.name}</button
                >
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </nav>
    {#if currentPage}
      <svelte:component this={currentPage} />
    {/if}
  </div>
</main>
