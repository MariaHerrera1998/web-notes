<script>
    import "../firebase";
    import { db } from "../firebase";

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
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
    />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</svelte:head>

<div id="container">
    <div class="whysign">
        <h1>Registra una Nota...</h1>
        <p>Guarda apuntes, Agenda tu día!</p>
        <p>
            Además ahora puedes Guardar, Modificar o Eliminar tus notas con un
            click!
        </p>
    </div>
    <div class="signup">
        <form on:submit|preventDefault={handleSubmit}>
            <input
                id="titulo"
                type="text"
                bind:value={nota.titulo}
                maxlength="30"
                data-length="30"
                required
                placeholder="Título:"
            />
            <textarea
                id="descripcion"
                type="text"
                bind:value={nota.descripcion}
                maxlength="200"
                data-length="30"
                required
                placeholder="Descripción:"
            /><br />

            <button class="btn btn-info" style="width: auto;"
                >{#if !editStatus} Registrar {:else} Update {/if}
            </button>
            {#if editStatus}
                <button class="btn btn-danger" on:click={cancel}
                    >Cancelar</button
                >
            {/if}
        </form>
        <br />
    </div>
</div>
{#each notes as nota}
    <div class="contend">
        <table class="table table-striped">
            <thead>
                <tr class="table-secondary">
                    <th>TITULO</th>
                    <th>DESCRIPCION</th>
                    <th />
                </tr>
            </thead>
            <tbody id="tabla">
                <tr class="table-info">
                    <td>{nota.titulo}</td>
                    <td>{nota.descripcion}</td>
                    <td>
                        <button
                            class="btn btn-warning btn-sn"
                            on:click={editNota(nota)}>Actualizar ✏️</button
                        >
                        <button
                            class="btn btn-danger btn-sn"
                            on:click={deleteNote(nota.id)}>Eliminar🗑️</button
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
{/each}

<style>

    .table-secondary {
        width: max-content;
    }
    .contend {
        font-family: serif;
        color: black;
        margin-top: 4%;
        margin-left: 19%;
        margin-right: 21%;
    }

    #container {
        width: 840px;
        margin: 25px auto;
        margin-bottom: 100px;
    }

    .whysign {
        float: left;
        width: 400px;
        height: 300px;
        border-radius: 5px 0 0 5px;
        padding: 30px 20px;
        padding-top: 20px;
        padding-right: 20px;
        border-top-style: groove;
        border-bottom-style: groove;
        border-left-style: groove;
        background-color: rgba(245, 204, 227, 0.781);
    }

    .signup {
        border-top-style: groove;
        border-right-style: groove;
        border-bottom-style: groove;
        background-color: rgba(245, 204, 227, 0.781);
        float: left;
        width: 400px;
        padding: 30px 20px;
        text-align: center;
        border-radius: 0 5px 5px 0;
        height: 300px;
    }

    [type="text"] {
        display: block;
        margin: 0 auto;
        width: 80%;
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 45px;
        line-height: 45px;
        margin-bottom: 10px;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.4);
        background-color: rgba(245, 204, 227, 0.781);
        outline: none;
    }

    textarea {
        display: block;
        margin: 0 auto;
        width: 80%;
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 45px;
        line-height: 45px;
        margin-bottom: 10px;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.4);
        background-color: rgba(245, 204, 227, 0.781);
        outline: none;
    }

    [type="text"]:focus {
        outline: none;
        border-color: #53cace;
    }

    h1 {
        color: rgba(0, 0, 0, 0.7);
        font-weight: 900;
        font-size: 2em;
    }

    p {
        color: rgba(0, 0, 0, 0.6);
        font-size: 1.2em;
        margin: 30px 0 30px 0;
    }
    p:nth-of-type(2) {
        font-size: 1em;
    }
</style>
