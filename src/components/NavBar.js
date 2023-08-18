import React from 'react'
import {Menu ,Container, Button , Icon,Image} from "semantic-ui-react";
import { useNavigate ,Link} from 'react-router-dom';



const NavBar = () => {
    const navigate = useNavigate();
  return (
<Menu style={{ padding: "0.3rem", marginBottom: "20px" }}>
  <Container>
    <Menu.Item name='home'>
      <Icon color='grey' name='home' size='huge' onClick={() => navigate(" ")} />
    </Menu.Item>

    <h2 style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
      CRUD MEMBER APPLICATION
    </h2>

    <Menu.Item position='right'>
      <Button style={{backgroundColor:"white"}}  onClick={() => navigate("/add")}>
        <Icon  name='add user' size='huge' />
      </Button>
    </Menu.Item>
  </Container>
</Menu>

  )
}

export default NavBar

