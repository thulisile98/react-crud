import React from 'react'
import {Menu ,Container, Button , Image} from "semantic-ui-react";
import { useNavigate ,Link} from 'react-router-dom';



const NavBar = () => {
    const navigate = useNavigate();
  return (
<Menu style={{padding:"0.3rem", marginBottom: "20px"}} >
    <Container>
           <Menu.Item name='home'>
            <Link>
            <Image size="mini" src="https://i.pinimg.com/originals/2c/68/43/2c6843f659d9a09bd1fd9adf19e37671.jpg" alt="logo" />
            </Link>
           </Menu.Item>

           <Menu.Item>
            <h2>React Crud application with Firebase</h2>
           </Menu.Item>

           <Menu.Item position='right'>
            <Button size="mini" primary onClick={()=>navigate("/add")}>Add Member</Button>
           </Menu.Item>
    </Container>
</Menu>
  )
}

export default NavBar

