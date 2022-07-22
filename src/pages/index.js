import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Index({ tasks = [] }) {
  const router = useRouter();
  
  // Render a not task view
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>Aún no ha ordenado nada.</h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" />
            <div>
              <Button primary onClick={() => router.push("/tasks/new")}>
                Ordenar
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  // Render a list of tasks
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/${task._id}`}>
                  <h1>Pedidos de mesa: {task.mesa}</h1>
                </Link>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>
                Cambiar estado del pedido de la mesa {task.mesa}
              </Button>
              <Button primary onClick={() => router.push(`/tasks/${task.mesa}`)}>
                Ver pedidos de la mesa {task.mesa}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
}
