<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  let message = "Hello, World!";
  let types = ["success", "error", "info"];
  let type = "success";
  let dismissible = true;
  let timeout = 0;

  let responseData;
  let visible = false;

  function toggleVissible() {
    visible = !visible;
  }

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/user/list");
      console.log(response);
      responseData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSubmit = (e) => {
    const ACTION_URL = e.target.action;

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      first_name: formData.get("firstName"),
      born_date: formData.get("bornDate"),
    };

    fetch(ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {});
  };
</script>

<main>
  <div class="body text-center">
    <div class="nav">
      <h1>UserManager</h1>
    </div>
    <div class="flex justify-around">
      <button on:click={fetchData}>Liste</button>
      <button on:click={toggleVissible}>Nouvel utilisateur</button>
    </div>
    <div class="text-center">
      {#if visible}
        <br />
        <div class="h-5"></div>
        <h3 class="font-bold text-xl">Création d'un utilisateur</h3>
        <form
          action="http://localhost:8080/user/create"
          method="POST"
          on:submit|preventDefault={handleSubmit}
        >
          <label for="name">Nom: </label>
          <input
            required
            name="name"
            type="text"
            class="rounded border border-gray-500 bg-gray-50"
          />
          <label for="firstName">Prénom: </label>
          <input
            required
            name="firstName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50"
          />
          <label for="bornDate">Date de naissance: </label>
          <input
            required
            name="bornDate"
            type="date"
            class="rounded border border-gray-500 bg-gray-50"
          /><br />
          <div class="h-5"></div>
          <button
            type="submit"
            class="rounded bg-green-500 text-white font-bold p-2">CREER</button
          >
        </form>
      {/if}
      {#if responseData}
        <br />
        <div class="h-5"></div>
        <div class="flex justify-center">
          <DataTable style="max-width: 100%;">
            <Head>
              <Row>
                <Cell>Nom</Cell>
                <Cell>Prénom</Cell>
                <Cell>Date de naissance</Cell>
                <Cell>Action</Cell>
              </Row>
            </Head>
            <Body>
              {#each responseData as option (option.name)}
                <Row>
                  <Cell>{option.name}</Cell>
                  <Cell>{option.firstName}</Cell>
                  <Cell>{option.bornDate}</Cell>
                  <Cell>
                    <button
                      class="rounded p-2 bg-orange-400 text-white font-bold"
                    >
                      MODIFIER
                    </button>
                    <button class="rounded p-2 bg-red-400 text-white font-bold">
                      SUPPRIMER
                    </button>
                  </Cell>
                </Row>
              {/each}
            </Body>
          </DataTable>
        </div>
      {/if}
    </div>
  </div>
</main>
