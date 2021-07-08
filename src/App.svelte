<script>
  import "./firebase";
  import { initAuth } from "./auth";
  import { fade } from "svelte/transition";
  import { Router, Route, Link } from "svelte-navigator";
  import Registro from "./components/Registro.svelte";
  import Notes from "./components/Notes.svelte";
  import Allnotes from "./components/Allnotes.svelte";

  const { loginWithEmailPassword, loginWithGoogle, logout, user } =
      initAuth();

  let error = null;

  const loginHandler = async (event) => {
      const { email, password } = event.target.elements;
      try {
          error = null;
          await loginWithEmailPassword(email.value, password.value);
      } catch (err) {
          error = err;
      }
  };


</script>

<svelte:head>
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
  />
</svelte:head>
<Router>
  {#if $user}
      <header class="headerppal">
          <figure class="header-logotipo">
              <img src="logoweb.png" alt="Blog Logotipo" />
          </figure>
          <h2 class="titulo">Notas Web</h2>
          <h3 class="titulo-a">
              Tus notas cuando quieras y en donde quieras!
          </h3>      
          <figure class="header-avatar">
              <img id="avatar" src="userw.png" alt="Avatar" />            
          </figure>
          <button class="btn btn-light" style="float: right; margin-right: 40px; color: black; width: 8%;" on:click={logout}> Salir </button>
      </header>
      <nav class="menu">
          <ul>
              <Link to="allnotas">Todas las Notas</Link>
              <Link to="notas">Agregar Nota +</Link>
          </ul>
      </nav>
  {:else}
      <section class="vh-100">
          <div class="container c1">
              <div class="myCard">
                  <div class="row g-0 p-3 row1">
                      <div class="w-100 align-self-start mx-auto">
                          <h1 class="mt-5 h2 text-center mb-2">
                              Ingresa a Notas Web
                          </h1>
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
                                  <label
                                      for="floatingInput"
                                      class="label2 form-text">Usuario</label
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
                                  <label
                                      for="floatingInput"
                                      class="label2 form-text"
                                      >Contraseña</label
                                  >
                              </div>
                              {#if error}
                                  <div
                                      transition:fade
                                      class="p-2 mb-6 bg-red-300"
                                  >
                                      {error.message}
                                  </div>
                              {/if}
                              <div class="mt-5">
                                  <button
                                      type="submit"
                                      class="btn btn1 w-100 mb-1"
                                      >Acceder
                                  </button><br /><br />
                                  <button
                                      type="button"
                                      class="btn btn2 w-100 mb-1"
                                      on:click|preventDefault={loginWithGoogle}
                                      >Acceder con Google</button
                                  >
                              </div>
                          </form>
                          <div class="card-footer text-center py-3">
                              <div class="small">
                                  <nav>
                                      <Link to="registro"
                                          >No tienes cuenta? Regístrate</Link
                                      >
                                  </nav>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  {/if}

  <main>
      <Route path="registro">
          <Registro />
      </Route>

      <Route path="notas">
          <Notes />
      </Route>

      <Route path="allnotas">
          <Allnotes />
      </Route>
  </main>
</Router>

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
  .btn {
      line-height: initial !important;
  }
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
  .btn1 {
      background-color: darkblue;
      color: white;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
  }
  .btn2 {
      background-color: peru;
      color: white;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
      width: 100%;
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
  .p-2 {
      color: white;
      font-family: sans-serif;
  }

  .headerppal {
      background: rgb(12, 180, 185);
      overflow: hidden;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
      padding-bottom: 30px;
      text-align: center;
  }
  .headerppal .titulo {
      color: #fff;
      font-size: 40px;
      font-family: "Montserrat", sans-serif;
      margin-top: 30px;
      margin-bottom: 0;
  }
  .headerppal .titulo-a {
      color: #fff;
      font-size: 20px;
      padding-top: 5px;
      padding-bottom: 15px;
  }
  .headerppal .header-logotipo {
      margin-right: 5em;
      margin-left: 50px;
      margin-top: 20px;
  }
  .headerppal .header-logotipo img {
      border-right-style: solid;
      border-width: 2px;
      border-color: #fff;
      border-radius: 60%;
      height: 140px;
      padding: 20px;
      width: 140px;
      transition: 0.6s;
  }
  .headerppal .header-logotipo img:hover {
      transform: scale(1.2);
  }
  .headerppal .header-avatar {
      display: none;
      float: right;
      margin-top: -200px;
      margin-right: 50px;
  }
  .headerppal .header-avatar img {
      border-radius: 60%;
      height: 80px;
      width: 80px;
      transition: 0.6s;
      transform: translateY(100px);
  }
  .menu {
      background: #936f97bb;
      border-left: 10px solid #fff;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
      font-family: cursive;
  }
  .menu ul {
      margin: 0px;
  }
  .menu ul {
      display: block;
      line-height: 40px;
      transition: 0.6s;
  }
  .menu ul:hover {
      background: #936f97bb;
  }
  .menu ul {
      color: #fff;
      text-decoration: none;
      padding: 0 1em;
      transition: 0.6s;
  }
  .menu ul :hover {
      font-size: 17px;
  }
  @media screen and (min-width: 768px) {
      .headerppal {
          text-align: left;
      }
      .headerppal .header-logotipo {
          float: left;
      }
      .headerppal .header-avatar {
          display: inline-block;
      }
      .menu ul {
          height: 40px;
      }
      .menu ul {
          display: inline-block;
      }
  }
</style>