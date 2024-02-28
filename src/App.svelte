<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  let responseData;
  let createUser = {
    displayZone: false,
    success: false,
    error: false,
  };
  let modifyUser = {
    displayZone: false,
    success: false,
    error: false,
    user: null,
  };

  let deleteUser = {
    displayZone: false,
    success: false,
    error: false,
    user: null,
  };

  function toggleVissible() {
    createUser.displayZone = !createUser.displayZone;
    modifyUser.displayZone = false;
  }

  function modifyUserVissible(userId) {
    modifyUser.user = responseData.filter((option) => option.id == userId)[0];
    modifyUser.displayZone = true;
    responseData = false;
    createUser.displayZone = false;
  }

  function deleteUserVissible(url, userId) {
    if (
      confirm(
        "Voulez-vous vraiment supprimer l'utilisateur ayant l'ID: " + userId,
      )
    ) {
      handleSubmitDelete(url + userId);
    }
  }

  fetchData();

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/user/list");
      responseData = await response.json();
      modifyUser = {
        displayZone: false,
        success: false,
        error: false,
        user: null,
      };
      createUser = {
        displayZone: false,
        success: false,
        error: false,
      };
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const handleSubmitDelete = (url) => {
    const ACTION_URL = url;

    fetch(ACTION_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        deleteUser.displayZone = false;
        deleteUser.success = true;
        alert("L'utilisateur a bien été supprimé");
        setTimeout(() => {
          deleteUser.success = false;
          fetchData();
        }, 2000);
      })
      .catch((error) => {
        deleteUser.error = true;
        console.log("Error add data: ", error);
      });
  };

  const handleSubmitModify = (e) => {
    const ACTION_URL = e.target.action;

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("inputName"),
      firstName: formData.get("inputFirstName"),
      bornDate: formData.get("inputBornDate"),
    };

    fetch(ACTION_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        modifyUser.displayZone = false;
        modifyUser.success = true;
        setTimeout(() => {
          modifyUser.success = false;
          fetchData();
        }, 2000);
      })
      .catch((error) => {
        modifyUser.error = true;
        console.log("Error add data: ", error);
      });
  };

  const handleSubmit = (e) => {
    const ACTION_URL = e.target.action;

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("inputName"),
      firstName: formData.get("inputFirstName"),
      bornDate: formData.get("inputBornDate"),
    };

    fetch(ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        createUser.displayZone = false;
        createUser.success = true;
        responseData = false;
        fetchData();
        setTimeout(() => {
          createUser.success = false;
        }, 5000);
      })
      .catch((error) => {
        createUser.error = true;
        console.log("Error add data: ", error);
      });
  };
</script>

<main>
  <div class="body text-center">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
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
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page">Accueil</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >Gestion des utilisateurs</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="space h-10"></div>
    <div class="text-center">
      <h1 class="font-bold text-5xl">Gestion des utilisateurs</h1>
    </div>
    <div class="space h-5"></div>
    <div class="flex justify-around">
      <button
        class="rounded-xl bg-black text-white font-bold p-4"
        on:click={toggleVissible}>AJOUTER UN UTILISATEUR</button
      >
    </div>
    <div class="text-center">
      {#if createUser.displayZone}
        <button
          class="rounded-xl bg-black text-white font-bold p-4 mt-2"
          on:click={fetchData}>LISTE</button
        >
        <br />
        <div class="h-5"></div>
        <h3 class="font-bold text-xl">Création d'un utilisateur</h3>
        <div class="space h-3"></div>
        <form
          action="http://localhost:8080/user/create"
          method="POST"
          on:submit|preventDefault={handleSubmit}
        >
          <label for="inputName">Nom: </label>
          <input
            required
            id="inputName"
            name="inputName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
          /><br />
          <label for="inputFirstName">Prénom: </label>
          <input
            required
            id="inputFirstName"
            name="inputFirstName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
          /><br />
          <label for="inputBornDate">Date de naissance: </label>
          <input
            required
            id="inputBornDate"
            name="inputBornDate"
            type="date"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
          /><br />
          <div class="h-5"></div>
          <button
            type="submit"
            class="rounded bg-green-500 text-white font-bold p-2">CREER</button
          >
        </form>
      {:else if createUser.success}
        <div class="rounded bg-green-600 flex justify-center m-10">
          <p class="text-white text-center font-bold">
            Utilisateur crée avec succès !
          </p>
        </div>
      {:else if createUser.error}
        <div class="rounded bg-red-600 flex justify-center m-10">
          <p class="text-white text-center font-bold">
            Une erreur est survenue...
          </p>
        </div>
      {/if}
      {#if modifyUser.success}
        <div class="rounded bg-green-600 flex justify-center m-10">
          <p class="text-white text-center font-bold">
            Utilisateur ID: {modifyUser.user.id} modifié avec succès !
          </p>
        </div>
      {:else if modifyUser.error}
        <div class="rounded bg-red-600 flex justify-center m-10">
          <p class="text-white text-center font-bold">
            Une erreur est survenue...
          </p>
        </div>
      {/if}
      {#if responseData}
        <br />
        <div class="h-5"></div>
        <h3 class="font-bold text-xl">Liste des utilisateurs</h3>
        <div class="space h-3"></div>
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
              {#each responseData as option}
                <Row>
                  <Cell hidden>{option.id}</Cell>
                  <Cell>{option.name}</Cell>
                  <Cell>{option.firstName}</Cell>
                  <Cell>{option.bornDate}</Cell>
                  <Cell>
                    <button
                      class="rounded p-2 bg-orange-400 text-white font-bold"
                      on:click={() => modifyUserVissible(option.id)}
                    >
                      MODIFIER
                    </button>
                    <button
                      class="rounded p-2 bg-red-400 text-white font-bold"
                      on:click={() =>
                        deleteUserVissible(
                          "http://localhost:8080/user/delete/",
                          option.id,
                        )}
                    >
                      SUPPRIMER
                    </button>
                  </Cell>
                </Row>
              {/each}
            </Body>
          </DataTable>
        </div>
      {:else if modifyUser.displayZone}
        <button
          class="rounded-xl bg-black text-white font-bold p-4 mt-2"
          on:click={fetchData}>LISTE</button
        >
        <div class="h-5"></div>
        <h3 class="font-bold text-xl">
          Modification de l'utilisateur ID: {modifyUser.user.id}
        </h3>
        <div class="space h-3"></div>
        <form
          action="http://localhost:8080/user/update/{modifyUser.user.id}"
          method="PUT"
          on:submit|preventDefault={handleSubmitModify}
        >
          <label for="inputModifyName">Nom: </label>
          <input
            required
            id="inputModifyName"
            name="inputName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={modifyUser.user.name}
          /><br />
          <label for="inputModifyFirstName">Prénom: </label>
          <input
            required
            id="inputModifyFirstName"
            name="inputFirstName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={modifyUser.user.firstName}
          /><br />
          <label for="inputModifyBornDate">Date de naissance: </label>
          <input
            required
            id="inputModifyBornDate"
            name="inputBornDate"
            type="date"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={modifyUser.user.bornDate}
          /><br />
          <div class="h-5"></div>
          <button
            type="submit"
            class="rounded bg-green-500 text-white font-bold p-2"
            >MODIFIER</button
          >
        </form>
      {/if}
    </div>
  </div>
</main>
