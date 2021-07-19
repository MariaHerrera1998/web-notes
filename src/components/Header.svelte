<script>
  import { initAuth } from "../auth/index";
  import { mdiAccountCircle } from "@mdi/js";
  import { Button, Avatar, Icon } from "svelte-materialify";

  const { logout } = initAuth();
</script>

<header class="headerppal teal">
  <figure class="header-logotipo">
    <img src="logoweb.png" alt="Blog Logotipo" />
  </figure>
  <span class="white-text h1" style="float: left;">
    BIENVENIDO A NOTAS WEB</span
  ><br /><br /><br />
  <br />
  <span class="white-text h3" style="float: left;"
    >Guarda tus notas, Agenda tu día!</span
  >
</header>

<style>
  .headerppal {
    overflow: hidden;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
    padding-bottom: 30px;
    text-align: center;
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
    float: left;
  }
  .headerppal .header-logotipo img:hover {
    transform: scale(1.2);
  }
</style>
