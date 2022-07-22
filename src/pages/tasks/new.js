import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import {Dropdown} from 'semantic-ui-react'
import { useRouter } from "next/router";

const NewTask = () => {
  const menu = [
    {key:'completo', text:'Completo', value:'completo'},
    {key:'sandwhich', text:'Sandwich', value:'sandwich'},
    {key:'hamburguesa', text:'Hamburguesa', value:'hamburguesa'},
    {key:'pizza', text:'Pizza', value:'pizza'},
    {key:'postre', text:'Postre', value:'postre'},
  ]
  const mesas = [
    {key:'1', text:'1', value:'1'},
    {key:'2', text:'2', value:'2'},
    {key:'3', text:'3', value:'3'},
    {key:'4', text:'4', value:'4'},
    {key:'5', text:'5', value:'5'},
    {key:'6', text:'6', value:'6'},
    {key:'7', text:'7', value:'7'},
    {key:'8', text:'8', value:'8'},
    {key:'9', text:'9', value:'9'},
    {key:'10', text:'10', value:'10'},
  ]
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
    price: "",
    mesa: "",
  });
  const array = [...Array(10)];
  return (
    <Grid>
      <Grid.Column width={16}>
        <Form>
          <Form.Field>
            <label>Título</label>
            <Dropdown placeholder='Selecciona una opción' options={menu}
            fluid
            selection
            value={task.title}
            onChange={(e, {value}) => setTask({...task, title: value})}
             />
          </Form.Field>
          <Form.Field>
            <label>Descripción</label>
            <input

              placeholder="Tipo de ______ (ej: completo italiano)"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Precio</label>
            <input
              placeholder="Precio"
              value={task.price}
              onChange={(e) => setTask({ ...task, price: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Mesa</label>
            <Dropdown placeholder='Selecciona una opción' options={mesas}
            fluid
            selection
            value={task.mesa}
            onChange={(e, {value}) => setTask({...task, mesa: value})}
             />
          </Form.Field>
          <Button
            type="submit"
            onClick={() => {
              fetch("/api/tasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
              })
                .then((res) => res.json()).then((res) => {
                  router.push("/");
                })
            }
            }
          >
            Crear
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default NewTask;
