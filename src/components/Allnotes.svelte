<script>
    import "../firebase";
    import { db } from "../firebase";
    
    let nota = {
      titulo: "",
      descripcion: "",
    };
  
    let notes = [];
  
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
  
  {#each notes as nota}
    <div class="container" style="text-align: center;">
      <div class="titulo">
        <h3>{nota.titulo}</h3>
      </div>
  
      <div class="description">
        <p>{nota.descripcion}</p>
      </div>
    </div>
  {/each}
  <style>
    .container {
      font-family: serif;
      color: black;
      margin-top: 2%;
      width: 40%;
      border-radius: 5px 5px 5px 5px;
      background: rgb(238, 174, 202);
      background: radial-gradient(
        circle,
        rgba(238, 174, 202, 1) 0%,
        rgba(148, 187, 233, 1) 100%
      );
    }
  </style>
  