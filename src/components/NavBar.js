import React from 'react'
import {Menu ,Container, Button , Icon,Image} from "semantic-ui-react";
import { useNavigate ,Link} from 'react-router-dom';



const NavBar = () => {
    const navigate = useNavigate();
  return (
<Menu style={{padding:"0.3rem", marginBottom: "20px"}} >
    <Container>
           <Menu.Item name='home'>
           
            <Icon color='grey' name='home' size='huge'  onClick={()=>navigate(" ")} />
            
           </Menu.Item>

           <Menu.Item>
            <h2>My React Crud Application with Firebase</h2>
           </Menu.Item>

           <Menu.Item position='right'>
            <Button size="mini" color='grey' onClick={()=>navigate("/add")}>Add Member</Button>
           </Menu.Item>
    </Container>
</Menu>
  )
}

export default NavBar

