import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";

const Task = ({ task, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();
  const verifyIfTheTableIsTheSame = () => {
    if (task.mesa !== query.id) {
      push(`/tasks/${task.mesa}`);
    }
  }
  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask();
    push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          {isDeleting ? (
            <Loader active />
          ) : (
            <>
              <h1>PLATO: {task.title}</h1>
              <h1>ESPECIFICACIONES: {task.description}</h1>
              <h1>MESA: {task.mesa}</h1>
              <Button

                onClick={open}
              >
                Eliminar
              </Button>
              <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
                content="¿Estás seguro de que quieres eliminar esta orden?"
              />
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();

    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Task;
