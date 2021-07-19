<script>
  import { Router, Link } from "svelte-navigator";
  import firebase from "firebase/app";
  import "firebase/auth";
  import { Button } from "svelte-materialify";

  function registrar() {
    var email = document.getElementById("emails").value;
    var password = document.getElementById("passwords").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        location.href = "/";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
</script>

<Router>
  <section class="vh-100">
    <div class="container c1">
      <div class="myCard">
        <div class="row g-0 p-3 row1">
          <div class="w-100 align-self-start mx-auto">
            <h1 class="mt-5 h2 text-center mb-2">Registra tu cuenta</h1>
            <br />
            <form id="myForms" class="pt-3 p-4 w-100">
              <div class="form-floating mb-2 w-100">
                <input
                  type="text"
                  class="form-control border-1"
                  id="emails"
                  name="email"
                  placeholder="name@example.com"
                />
                <label for="floatingInput" class="label2 form-text">Email</label
                >
              </div>
              <div class="form-floating mb-3 w-100">
                <input
                  type="password"
                  class="form-control border-1"
                  id="passwords"
                  autocomplete="off"
                  name="password"
                  placeholder=" Contraseña"
                />
                <label for="floatingInput" class="label2 form-text"
                  >Contraseña</label
                >
              </div>

              <div class="mt-5">
                <Button
                  block
                  type="submit"
                  class="teal white-text"
                  on:click={registrar}>Crear Cuenta</Button
                >
              </div>
            </form>
            <div class="card-footer text-center py-3">
              <nav>
                <Link to="/" style="color: white;">Ya tienes una cuenta?</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  #myForms {
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
</style>
