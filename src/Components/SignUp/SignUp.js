import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { auth, fs } from '../../Config/Firebase';
import "../Login/Login.css"
import Alert from '@mui/material/Alert';

const SignUp = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const useStyles = makeStyles({
        text1: {
          textAlign: "center"
        }
    })
    const classes = useStyles();
    const handleLogin = () => {
      auth.createUserWithEmailAndPassword(email, password).then((user) => {
        fs.collection('users').doc(user.user.uid).set({
          FullName: fullName,
          Email: email,
        }).then(() => {
          setEmail('');
          setPassword('');
          setPassword('');
          setError('');
          navigate('/login');
        }).catch((err) => {
          setError(err.message);
          setTimeout(() => {
            setError('');
          }, 3000)
        })
      }).catch((err) => {
        setError(err.message);
          setTimeout(() => {
            setError('');
          }, 3000)
      }) 
    }
    return (
    <div className="container">
        <div className="login-card">
        <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.text1} style={{fontSize: "1.8rem", fontWeight: "500"}}>Sign Up</Typography>
        {
        error && <><Alert severity="error">{error}</Alert>
        </>
        }  
        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" value = {fullName} onChange={(e) => setFullName(e.target.value)} size="small" required/>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" value = {email} onChange={(e) => setEmail(e.target.value)} size="small" required/>
        <TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth={true} margin="dense" size="small" value = {password} onChange={(e) => setPassword(e.target.value)} required />
        <Button variant="contained" fullWidth={true} onClick={handleLogin} style={{marginTop: "1rem"}}>Sign Up</Button>
      </CardContent>
    </Card>
    <Typography variant="subtitle1" className={classes.text1} style={{fontSize: "1.2rem", marginTop: "0.6rem"}}>Already have an account? <Link to="/login" style={{color: "#2b87d9"}}>Login</Link></Typography>
        </div>
    </div>
  )
}

export default SignUp;