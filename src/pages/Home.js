import React, {useEffect,useState} from 'react';
import{db} from "../firebase";
import {Button,Card, Grid,  Container, Image,Icon, CardDescription, Modal} from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import {collection, doc, onSnapshot } from 'firebase/firestore';
import ModalComp from '../components/ModalComp';


const Home = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
        const unsub = onSnapshot(collection(db,"users"),(snapshot)=>{
            let list = [];
            snapshot.docs.forEach((doc)=>{
                list.push({id: doc.id, ...doc.data()})
            });
            setUsers(list);
            setLoading(false)
        },(error) =>{
            console.log(error);
        });
     return () =>{
        unsub();
     }
    },[]);

    const handleModal=(item) =>{
     setOpen(true);
     setUser(item);
    };

  return (
   <Container>
    <Card.Group>
        <Grid stackable>
            {users && users.map((item)=>(
                  <Grid.Row key={item.id}>
                    <Card style={{width:"1000px"}}>

                        <Card.Content>
                        
                           <Image src={item.img} size="large" 
                           style={{height:"100px",
                           width:"150px",
                           borderRadius:"20%",}}  /> 
                        <Card.Header style={{ marginTop: '10px', textAlign: 'center' }}>{item.fullName}</Card.Header>
                        <Card.Description>{item.jobTitle}</Card.Description>
                        </Card.Content>

                        <Card.Content extra>
                          <div>
                            <Button  onClick={()=>navigate(`/update/${item.id}`)}> <Icon name='edit' size='large' /></Button>
                            <Button color="grey" onClick={()=>handleModal(item)}>VIEW</Button>
                            {open && (<ModalComp open={open} setOpen={setOpen}  handleDelete={()=> console.log("delete")}
                            {...user} />)}
                            <Button><Icon name='trash' size='large' /></Button>
                          </div>
                        </Card.Content>

                    </Card>

                   </Grid.Row>
            ))}
          
        </Grid>
    </Card.Group>

   </Container>
  )
}

export default Home

