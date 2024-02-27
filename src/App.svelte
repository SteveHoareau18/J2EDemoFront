<script>
  import { onMount } from "svelte";

  let responseData;

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/user/list");
      console.log(response);
      responseData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
</script>

<main>
  <div class="body text-center">
    <div class="nav">
      <h1>User Manager</h1>
    </div>
    <div class="flex justify-around">
      <button on:click={fetchData}>List</button>
      <a href="#">Add</a>
    </div>
    <div>
      {#if responseData}
        <ul>
          {#each responseData as item}
            <li>{item.name}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>
