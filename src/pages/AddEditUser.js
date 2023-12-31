import React,{useState,useEffect} from 'react';
import {Button, Form, Grid, Loader,Message} from "semantic-ui-react";
import {storage,db} from "../firebase";
import{useParams, useNavigate} from "react-router-dom";
import { getDownloadURL,uploadBytesResumable, ref } from 'firebase/storage';
import { addDoc,doc, collection, getDoc, serverTimestamp, setDoc, snapshotEqual, updateDoc } from 'firebase/firestore';


const initialState ={
    fullName:"",
    email:"",
    jobTitle:"",
}


const AddEditUser = () => {

const [data, setData]= useState(initialState);
const {fullName,email,jobTitle}= data;
const [file, setFile]= useState(null);
const [progress, setProgress]= useState(null);
const [errors, setErrors]= useState({});
const [isSubmit, setIsSubmit]= useState(false);
const navigate = useNavigate();
const [noMembers, setNoMembers] = useState(false);
const   {id}=useParams();

useEffect(()=>{
id && getSingleUser();
},[id])

useEffect(() => {
    if (noMembers) {
      setData(initialState);
      setErrors({});
    }
  }, [noMembers]);

const getSingleUser = async()=>{
    const docRef =  doc(db,"users", id);
    const snapshot = await getDoc(docRef);

    if(snapshot.exists()){
        setData({...snapshot.data()});
    }  else {
        setNoMembers(true);
    }

}

useEffect(()=>{
    const UploadFile = ()=>{
        const name = new Date().getTime()+ file.name;
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot)=>{
            const progress= (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
            setProgress(progress);
            switch(snapshot.state){
                case "paused":
                    console.log("Upload is Paused");
                    break;
                    case "running":
                    console.log("Uploading");
                    break;
                       default:
                     break;
            }
        }, (error)=>{
            console.log(error)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setData((prev)=>({...prev, img:downloadURL}));
            });
        }
        );
    };
   file && UploadFile()
},[file]);

const handleImageUpload = async () => {
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    }
    return null;
  };

const handleEditUser = async () => {
    const newImageURL = await handleImageUpload();

    try {
      await updateDoc(doc(db, 'users', id), {
        ...data,
        img: newImageURL || data.img, 
        timestamp: serverTimestamp()
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };



const handleChange=(e) =>{
    setData({...data, [e.target.name]: e.target.value});
};


const validate =()=>{
    let errors = {};

    if(!fullName){
        errors.fullName = "Name is Required"
    }
    if(!email){
        errors.email = "email is Required"
    }
    if(!jobTitle){
        errors.jobTitle = "Job title is Required"
    }

    return errors;
}

const handleSubmit= async (e) =>{
    e.preventDefault();
    let errors =  validate();
    if(Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if(!id){
        try{
            await addDoc(collection(db,"users"),{
             ...data, timestamp: serverTimestamp()
            });
        }catch(error)
        {
           console.log(error);
        }
     
    }else{
        try{
            await updateDoc(doc(db,"users",id),{
                ...data, timestamp: serverTimestamp()
            });
        }catch(error)
        {
           console.log(error);
        }
    }
   
    navigate("/");

};


  return (
    <div>
      <Grid centered verticalAlign="middle" columns="3" style={{height:"80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign="center">
             <div style={{height:"250px", width:"500px"}}>
             {noMembers ? ( 
                <Message info>
                  <Message.Header>No members in the database.</Message.Header>
                  <p>Please add a member to the database.</p>
                </Message>
                 ) :isSubmit? <Loader active inline="centered" size="huge" />:(
                   <>
                   <h2>{id ? "UPDATE MEMBER" : "ADD MEMBER"}</h2>
                   <Form onSubmit={handleSubmit}>
                     <Form.Input label="fullName" error={errors.fullName ? {content:errors.fullName}: null} placeHolder="Enter Full Name" name="fullName" onChange={handleChange} value={fullName} autoFocus />
                     <Form.Input label="email"  error={errors.email ? {content:errors.email}: null} placeHolder="Enter email" name="email" onChange={handleChange} value={email}  />
                     <Form.Input label="jobTitle"  error={errors.jobTitle ? {content:errors.jobTitle}: null} placeHolder="Enter job Title" name="jobTitle" onChange={handleChange} value={jobTitle} />
                     <Form.Input label="Upload" type="file" onChange={(e)=> setFile(e.target.files[0])}>
                     </Form.Input>
                     <Button primary type="submit" disabled={progress !== null &&  progress < 100}  style={{backgroundColor:"grey"}} onClick={handleEditUser}>Add Member</Button>
                
                   </Form>
                   </>
                )}
             </div>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AddEditUser

