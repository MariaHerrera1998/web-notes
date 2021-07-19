<script>
  import "./firebase";
  import { initAuth } from "./auth";
  import { db } from "./firebase";
  import { fade } from "svelte/transition";
  import { Router, Route, Link } from "svelte-navigator";
  import Registro from "./components/Registro.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import {
    DataTable,
    DataTableHead,
    DataTableRow,
    DataTableCell,
    DataTableBody,
  } from "svelte-materialify";
  import { Tabs, Tab, Window, WindowItem, AppBar } from "svelte-materialify";
  import {
    Card,
    CardText,
    CardActions,
    Button,
    TextField,
    Row,
    Col,
    Textarea,
    Dialog,
  } from "svelte-materialify";

  const { loginWithEmailPassword, loginWithGoogle, logout, user } = initAuth();

  let error = null;
  let active1;

  const loginHandler = async (event) => {
    const { email, password } = event.target.elements;
    try {
      error = null;
      await loginWithEmailPassword(email.value, password.value);
    } catch (err) {
      error = err;
    }
  };
  let value = 0;
  let nota = {
    titulo: "",
    descripcion: "",
  };

  let notes = [];
  let editStatus = false;
  let currentId;

  db.collection("notes").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    notes = [...docs];
    console.log(notes);
  });

  const addnote = async () => {
    await db
      .collection("notes")
      .doc()
      .set({
        ...nota,
        createAt: Date.now(),
      });
  };
  const updateNota = async () => {
    await db.collection("notes").doc(currentId).update(nota);
  };

  const handleSubmit = () => {
    if (!editStatus) {
      addnote();
    } else {
      updateNota();
    }
    nota = { titulo: "", descripcion: "" };
  };

  const deleteNote = async (id) => {
    await db
      .collection("notes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const editNota = async (currentNota) => {
    editStatus = true;
    nota.titulo = currentNota.titulo;
    nota.descripcion = currentNota.descripcion;
    currentId = currentNota.id;
  };

  const cancel = () => {
    editStatus = false;
    nota = { titulo: "", descripcion: "" };
  };

  db.collection("notes")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, "=>", doc.data());
      });
    });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
  />
</svelte:head>
{#if $user}
  <Header />
  <AppBar>
    <Tabs
      class="deep-purple accent-1
     indigo-text"
      bind:value
      fixedTabs
    >
      <div slot="tabs">
        <Tab>Todas las Notas</Tab>
        <Tab>Nueva Nota</Tab>
        <Tab style="float: right;">
          <Button block class="indigo white-text" on:click={logout}
            >Salir</Button
          ></Tab
        >
      </div>
    </Tabs>
  </AppBar>

  <Window {value} class="ma-4">
    <WindowItem>
      {#each notes as nota}
        <div class="notas" style="text-align: center;">
          <div class="titulo">
            <h3>{nota.titulo}</h3>
          </div>
          <div class="description">
            <p>{nota.descripcion}</p>
          </div>
        </div>
      {/each}
    </WindowItem>
    <WindowItem>
      <div
        class="grey lighten-5
        d-flex justify-center mt-6 mb-6"
      >
        <Card
          raised
          outlined
          style="width:600px;"
          class="deep-purple lighten-4"
        >
          <div class="pl-4 pr-4 pt-3">
            <span class="deep-purple-text overline justify-center">
              Nueva Nota
            </span>
            <br />
            <span class="deep-purple-text h5 mb-2"
              >GUARDA, MODIFICA O ELIMINA TUS NOTAS</span
            >
            <br />
          </div>
          <CardText>
            <form on:submit|preventDefault={handleSubmit}>
              <Row>
                <Col>
                  <TextField bind:value={nota.titulo}>Título:</TextField><br />
                  <Textarea autogrow rows={1} bind:value={nota.descripcion}
                    >Descripción:</Textarea
                  >
                  <br />
                </Col>
              </Row>
            </form>
          </CardText>
          <CardActions>
            <Button rounded class="blue white-text" on:click={handleSubmit}>
              {#if !editStatus} Registrar {:else} Actualizar {/if}
            </Button>
            {#if editStatus}
              <Button rounded class="red white-text" on:click={cancel}
                >Cancelar</Button
              >
            {/if}
          </CardActions>
        </Card>
      </div>
      {#each notes as nota}
        <div class="tabla-notas">
          <DataTable>
            <DataTableHead class="purple lighten-4">
              <DataTableRow>
                <DataTableCell />
                <DataTableCell>{nota.titulo}</DataTableCell>
                <DataTableCell />
              </DataTableRow>
            </DataTableHead>
            <DataTableBody class="cyan lighten-5">
              <DataTableRow>
                <DataTableCell>{nota.descripcion}</DataTableCell>
                <DataTableCell>
                  <Button
                    size="default"
                    class="yellow"
                    on:click={editNota(nota)}>Actualizar ✏️</Button
                  >
                  <Button
                    size="default"
                    class="red"
                    on:click={deleteNote(nota.id)}>Eliminar🗑️</Button
                  >
                </DataTableCell>
              </DataTableRow>
            </DataTableBody>
          </DataTable>
        </div>
        <br />
      {/each}
    </WindowItem>
  </Window>
  <div>
    <Footer />
  </div>
{:else}
  <Router>
    <section class="vh-100">
      <div class="container c1">
        <div class="myCard">
          <div class="row g-0 p-3 row1">
            <div class="w-100 align-self-start mx-auto">
              <h1 class="mt-5 h2 text-center mb-2">Ingresa a Notas Web</h1>
              <br />
              <form
                id="myForm"
                class="pt-3 p-4 w-100"
                on:submit|preventDefault={loginHandler}
              >
                <div class="form-floating mb-2 w-100">
                  <input
                    type="text"
                    class="form-control border-1"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput" class="label2 form-text"
                    >Usuario</label
                  >
                </div>
                <div class="form-floating mb-3 w-100">
                  <input
                    type="password"
                    class="form-control border-1"
                    id="password"
                    autocomplete="off"
                    name="password"
                    placeholder=" Contraseña"
                  />
                  <label for="floatingInput" class="label2 form-text"
                    >Contraseña</label
                  >
                </div>
                {#if error}
                  <div transition:fade class="p-2 mb-6 bg-red-300">
                    {error.message}
                  </div>
                {/if}
                <div class="mt-4">
                  <Button
                    block
                    type="submit"
                    class="indigo white-text"
                    size="large"
                    >Acceder
                  </Button><br />
                  <Button
                    block
                    type="button"
                    class="green white-text"
                    size="large"
                    on:click={loginWithGoogle}>Acceder con Google</Button
                  >
                </div>
              </form>
              <div class="card-footer text-center py-3">
                <div class="small">
                  <nav>
                    <Link to="registro">No tienes cuenta? Regístrate</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main>
      <Route path="registro">
        <Registro />
      </Route>
    </main>
  </Router>
{/if}

<style>
  .vh-100 {
    background-color: rgb(12, 180, 185);
  }
  :root {
    --bs-yellow: #ffef11;
    --bs-dark: #130707;
    --bs-primary: #1266f1;
    scroll-behavior: smooth;
  }
  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form-control,
  .h2 {
    color: rgb(196, 202, 218);
    font-family: cursive;
    font-weight: bold;
  }
  .form-control {
    max-height: 60px !important;
    color: black !important;
  }
  .label2 {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
  }
  .form-floating > label {
    padding: 0.5rem 0.75rem !important;
    text-align: left;
  }
  #myForm {
    text-align: left;
  }
  .row1 {
    height: 100%;
  }
  .myCard {
    position: relative;
    background: rgb(31, 30, 30);
    height: 100%;
    border-radius: 25px;
    -webkit-bos-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
  }
  .c1 {
    position: absolute;
    max-width: 500px;
    height: 560px;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .notas {
    width: 600px;
    max-height: 500px;
    font-family: cursive;
    margin: auto;
    background: rgb(100, 75, 191);
    background: linear-gradient(
      0deg,
      rgba(100, 75, 191, 0.4906337535014006) 28%,
      rgba(30, 234, 238, 0.3841911764705882) 87%
    );
  }

  .titulo {
    font-weight: bold;
  }

  .tabla-notas {
    width: 600px;
    max-height: 500px;
    margin: auto;
  }
</style>
