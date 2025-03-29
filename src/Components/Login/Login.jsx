import {Typography,FormControl,FormLabel,Button,Input,Link, Container, Box} from '@mui/material';
import React from "react"
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginThunkCreator } from '../../redux/auth-reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Схема валидации
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Login = ()=>{
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
  const { email, password } = data
  const result = await dispatch(loginThunkCreator(email, password))

  if (result.success) {
    // Перенаправление при успешной авторизации
    navigate('/profile')
  } else {
    // Показать ошибку пользователю
    alert(result.message)
  }
}

  return(
    <Container>
    <Box
    component="form"
    onSubmit={handleSubmit(onSubmit)}
    sx={{
      background: 'white',
      width: 300,
      mx: 'auto', // margin left & right
      my: 4, // margin top & bottom
      py: 3, // padding top & bottom
      px: 2, // padding left & right
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderRadius: '10px',
      boxShadow: '',
    }}
    variant="outlined"
  >
    <div>
      <Typography level="h4" component="h1">
        <b>Welcome!</b>
      </Typography>
      <Typography level="body-sm">Sign in to continue.</Typography>
    </div>
    <FormControl error={!!errors.email}>
  <FormLabel>Email</FormLabel>
  <Controller
    name="email"
    control={control}
    render={({ field }) => (
      <Input
        {...field}
        sx={{ borderColor: errors.email ? 'error.main' : 'secondary.main' }}
        type="email"
        placeholder="johndoe@email.com"
        autoComplete="email" // Добавлено здесь
        inputProps={{
          'aria-label': 'Email input',
        }}
      />
    )}
  />
  {errors.email && <Typography color="error" variant="caption">{errors.email.message}</Typography>}
</FormControl>
    <FormControl error={!!errors.password}>
  <FormLabel>Password</FormLabel>
  <Controller
    name="password"
    control={control}
    render={({ field }) => (
      <Input
        {...field}
        sx={{ borderColor: errors.password ? 'error.main' : 'secondary.main' }}
        type="password"
        placeholder="password"
        autoComplete="current-password" // Добавлено здесь
        inputProps={{
          'aria-label': 'Password input', // Улучшение доступности
        }}
      />
    )}
  />
  {errors.password && <Typography color="error" variant="caption">{errors.password.message}</Typography>}
</FormControl>
    <Button type='submit' variant="contained" sx={{ mt: 1 /* margin top */ }}>Log in</Button>
    <Typography sx={{ fontSize: 'sm', alignSelf: 'center' }}
    >
      Don&apos;t have an account?
      <Link href="/registration">Sign up</Link>
    </Typography>
  </Box>
  </Container>
  )
}

export default Login