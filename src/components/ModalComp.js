import React from 'react'
import {Modal,  Header,Image,Button,Icon} from "semantic-ui-react"


const ModalComp = ({open, setOpen, img, fullName, jobTitle,email,id,handleDelete}) => {
  return (
<Modal onClose={()=> setOpen(false)} onOpen={()=> setOpen(true)} open={open}>

 <Modal.Content image>
   <Image size="medium"  src={img} wrapped/>
   <Modal.Description style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: '20px' }}>
  <Header>{fullName}</Header>
  <p>{jobTitle}</p>
  <p>{email}</p>
</Modal.Description>
 </Modal.Content>

 <Modal.Actions>
 <Button color="black" onClick={()=>setOpen(false)}>Cancel</Button>
 <Button content="Delete" labelPosition="right" onClick={()=>handleDelete(id)}><Icon name='trash' size='large'   /></Button>
 </Modal.Actions>

</Modal>
  )
}

export default ModalComp
