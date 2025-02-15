import argetinaLogin from '../assets/fondo-copa-america-2024/argentinaLogin.png'
import { useState, useEffect, useRef } from 'react';
import { /*googleLogout*/GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginUserDB } from '../services/loginService';
import adminEmails from '../utils/adminEmails';
import { useNavigate } from 'react-router-dom'
import RulesDefinition from './RulesDefinition'
import LoginLayout from './LoginLayout';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData, updateUserLoginProcess } from '../redux/userSlice'
import { acceptTermsAndConditionsDB } from '../services/loginProcess';
import { getCookies } from '../services/cookiesService';
import GoogleLogo from "../assets/logos/googleLogo.png"

/**
 * @module Componente_Login
 * @description Componente Login que maneja el registro/logueo de un usuario
 */
function Login() {
    const dialogRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const globalUser = useSelector(state => state.user.user);
    const [user, setUser] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false);
  
    /**
     * Loguea a un jugador y lo redirije a la url correspondiente segun el estado de su 'proceso de login'
     * @function loginPlayer
     * @async
     * @param {Object} loginData - Data del login: mail y fullName
     * @param {string} loginData.username - El mail del usuario
     * @param {string} loginData.fullName - El nombre completo del usuario
     */
    const loginPlayer = async (loginData) => {
      const { username, fullName } = loginData;
      await loginUserDB({
        username,
        fullName,
        roleId: 2
      });
      const userToken = getCookies("jwt");
      const decodedToken = jwtDecode(userToken);
      dispatch(saveUserData(decodedToken));
      if (decodedToken?.loginProcess?.termsAndConditions) {
        if (decodedToken?.loginProcess?.selectAvatar) {
          navigate("/home");
        } else {
          navigate("/setAvatar");
        }
      } else {
        if (dialogRef.current) {
          dialogRef.current.showModal();
          dialogRef.current.scrollTop = 0;
        }
      }
    };
  
    /**
     * Acepta terminos y condiciones. Actualiza el estado de su 'proceso de login'
     * @async
     * @function acceptedTerms
     */
    const acceptedTerms = async () => {
      const updatedUserLoginProcess = await acceptTermsAndConditionsDB({ id: globalUser?.loginProcess?.id });
      dispatch(updateUserLoginProcess(updatedUserLoginProcess));
      navigate("/setAvatar");
    };
  
    /**
     * Loguea a un admin y navega al Home
     * @async
     * @function loginAdmin
     */
    const loginAdmin = async () => {
      const { username, fullName } = user;
      await loginUserDB({
        username,
        fullName,
        roleId: 1
      });
      const userToken = getCookies("jwt");
      const decodedToken = jwtDecode(userToken);
      dispatch(saveUserData(decodedToken));
      navigate("/home");
    };

    return (
        <LoginLayout>
            <main className='w-[500px] h-[380px] shadow-login absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-40 transition-transform bg-gray-900 rounded-2xl'>
                <img className='absolute bottom-0 -left-16 -bottom-3  h-[150%] ' src={argetinaLogin} alt="argentina players Login" />
                {
                    user !== null && Object.keys(user).length === 2 ? (
                        <div className='absolute top-1/4 left-1/3 flex flex-col gap-8 text-center h-3/5'>
                            <div>
                                <h3 className='text-[26px]'>¿Quieres gestionar o jugar?</h3>
                                <p>Elige tu rol para esta sesión</p>
                            </div>
                            <div className='h-full flex flex-col items-center justify-around gap-6'>
                                <button className='bg-cyan-900 w-full py-4 rounded-full shadow-login' onClick={() => loginPlayer(user)}>Modo Jugador</button>
                                <button className='bg-cyan-900 w-full py-4 rounded-full shadow-login' onClick={loginAdmin}>Modo Administrador</button>
                            </div>
                        </div>
                    ) : (
                        <div className='absolute top-1/4 left-1/3 flex flex-col gap-8 text-center'>
                            <div>
                                <h2 className='text-7xl font-bold'>PRODE</h2>
                                <p>La mejor plataforma para pronósticos deportivos</p>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <p>Inicia sesión en tu cuenta</p>
                                <GoogleLogin
                                className="hidden"
                                onSuccess={credentialResponse => {
                                    const decodedCredentials = jwtDecode(credentialResponse.credential);
                                    if (!adminEmails.includes(decodedCredentials.email)) {
                                    loginPlayer({
                                        username: decodedCredentials.email,
                                        fullName: decodedCredentials.name
                                    });
                                    } else {
                                    setUser({
                                        username: decodedCredentials.email,
                                        fullName: decodedCredentials.name
                                    });
                                    }
                                }}
                                width={"240"}
                                shape='pill'
                                onError={() => {
                                    console.log('Login Failed');
                                }}/>
                                <div className='flex items-center pointer-events-none justify-evenly p-2 rounded-[30px] bg-[#404040] w-[242px] relative inset-y-[-60px]'>
                                    <img className='h-[32px]' src={GoogleLogo}></img>
                                    Continua con google
                                </div>
                            </div>
                        </div>
                    )
                }
                <dialog ref={dialogRef} className='w-4/5 h-4/5 p-6 outline-none rounded-3xl text-left absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-[#FD2A2A] scrollbar-thumb-rounded-full scrollbar-track-blue-950'>
                    <h1 className='text-center text-[48px]'>Reglamento</h1>
                    <div className="w-full flex justify-center">
                        <RulesDefinition />
                    </div>
                    <div className='w-4/5 m-auto'>
                        <section className='w-4/5 m-auto'>
                            <p className='my-8'>Por favor, ten en cuenta que los puntajes de los pronósticos se actualizarán durante el horario laboral de lunes a viernes.</p>
                            <div className='flex gap-6 h-10 items-center'>
                                <input className={'self-stretch w-6 outline-none cursor-pointer'} type="checkbox" onClick={() => setAcceptTerms(prevState => !prevState)}/>
                                <span className={`text-[18px] ${acceptTerms ? 'text-green-600' : 'text-red-600'}`}>{acceptTerms ? 'Reglas aceptadas!' : 'He leído y acepto los términos '}</span>
                            </div>
                            <div className='text-center mt-10'>
                                <button className={`px-14 py-[10px] rounded-[20px] ${acceptTerms ? 'text-[#192B5B] bg-[#61DBC7]' : 'text-white bg-[#9B9B9B] cursor-default'}`} disabled={!acceptTerms} onClick={acceptTerms ? acceptedTerms : undefined}>Aceptar</button>
                            </div>
                        </section>
                    </div>
                </dialog>
            </main>
        </LoginLayout>
    )
}

export default Login