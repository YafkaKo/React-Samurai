import React, { useEffect } from 'react';
import {Container, Link, Typography} from "@mui/material";
import CallEndSharpIcon from '@mui/icons-material/CallEndSharp';
import CustomNavLink from '../Sidebar/CustomNavLink/CustomNavLink';
import axios from 'axios';
import { connect } from 'react-redux';
import {handleAuth} from '../../redux/auth-reducer'



const Header = (props) => {
    const {isAuth,login,handleAuth} = props
    useEffect(()=>{
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{withCredentials:true})
        .then(response=>{

            if(response.data.resultCode===0){
                const {id,login,email} =  response.data.data
                handleAuth(id,login,email)
            }
        })
        .catch(error => {
                console.error('Error fetching profile:', error); // Убираем состояние загрузки в случае ошибки
              });
    },[handleAuth,login])
    return (
            <Container component="header" sx={{pt: 2, pb: 2,
                borderBottom: "2px solid",
                borderColor: "background.default",
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Link href="/profile">
                    <CallEndSharpIcon sx={{ fontSize: 60, color: 'primary.main' , display:"flex",alignItems:"center"}} />
                </Link>

                {isAuth ? <Typography  sx={{alignContent: 'center'}}variant='h4'>{login}</Typography> : <CustomNavLink to={'/login'} text={'Login'}/>}
            </Container>
    );
};

const mapStateToProps = (state)=>{
    return({
        isAuth: state.auth.isAuth,
        login: state.auth.login

    })
}
const mapDispatchToProps ={ handleAuth }

export default connect(mapStateToProps,mapDispatchToProps)(Header);