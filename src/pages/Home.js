
import React, {useEffect,useState} from 'react';
import{db} from "../firebase";
import {Button,Card, Grid,  Container, Image,Icon, CardDescription, Modal} from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import {collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import ModalComp from '../components/ModalComp';
import  './Home.css';


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

    const handleDelete= async (id)=>{
      if(window.confirm("Are sure you want to delete the user ?"))
      {
        try{
          setOpen(false);
          await deleteDoc(doc(db, "users",id));
          setUsers(users.filter((user)=> user.id !== id));
        }catch(err)
        {
          console.log(err);
        }
      }
    }



  return (
    <Container className="contain">
    <Grid stackable>
      {users &&
        users.map((item) => (
          <Grid.Row key={item.id}>
            <Card className="cardbox">
              <Card.Content>
                <Image className='img' src={item.img} />
                <div className="card-content">

                  <div className='content'>
                  <Card.Header className="nameWrapper">{item.fullName}</Card.Header>
                  <Card.Description className="description">{item.jobTitle}</Card.Description>
                  </div>

                  <div className="buttons">
                    <Button onClick={() => navigate(`/update/${item.id}`)}>
                      <Icon name="edit" />
                    </Button>
                    <Button onClick={() => handleModal(item)}>
                      <Icon name="eye" />
                    </Button>
                    {open && (
                      <ModalComp
                        open={open}
                        setOpen={setOpen}
                        handleDelete={handleDelete}
                        {...user}
                      />
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Grid.Row>
        ))}
    </Grid>
  </Container>
  
  )
}

export default Home

