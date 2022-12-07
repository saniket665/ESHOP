import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import { makeStyles } from '@mui/styles';
import { auth } from '../../Config/Firebase';
import Alert from '@mui/material/Alert';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const useStyles = makeStyles({
      text1: {
        textAlign: "center"
      }, 
    })
    const classes = useStyles();
    const handleLogin = () => {
      auth.signInWithEmailAndPassword(email, password).then(() => {
        setEmail('');
        setPassword('');
        setError('');
        navigate("/");
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
        {
        error && <><Alert severity="error">{error}</Alert>
        </>
        }  
        <Typography variant="h5" className={classes.text1} style={{fontSize: "1.8rem", fontWeight: "500"}}>Login</Typography>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" value = {email} onChange={(e) => setEmail(e.target.value)} size="small" required />
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" fullWidth={true} margin="dense" size="small" value = {password} onChange={(e) => setPassword(e.target.value)} required />
        <Typography color="primary" variant="subtitle1" className={classes.text1} style={{marginTop: "0.5rem"}}>Forgot Password ?</Typography>
        <Button variant="contained" fullWidth={true} onClick={handleLogin} size="medium" style={{marginTop: "0.5rem"}}>Login</Button>
      </CardContent>
    </Card>
    <Typography variant="subtitle1" className={classes.text1} style={{fontSize: "1.2rem", marginTop: "0.6rem"}}>Don't have an account? <Link to="/signup" style={{color: "#2b87d9"}}>SignUp</Link></Typography>
        </div>
    </div>
  )
}

export default Login