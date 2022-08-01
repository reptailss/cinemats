import {useAppDispatch, useAppSelector} from "./hook";

import {
    useGetAuthSessionMutation,
    useLazyGetAuthTokenQuery,
    useLazyGetUserQuery,
    useOutAuthSessionMutation,
    useValidateTokenMutation
} from '../services/MovieService'
import {setAuth, setSession_id, setToken, setUser} from '../redux/slice/authSlice'
import {userInitial} from "../constans/user";

import {IBodyValidateToken} from '../types/auth'


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const [getAuthSession] = useGetAuthSessionMutation();
    const [outAuthSession] = useOutAuthSessionMutation();
    const [getUserData] = useLazyGetUserQuery();
    const [getAuthToken] = useLazyGetAuthTokenQuery();
    const [validateToken] = useValidateTokenMutation();

    const session = localStorage.getItem('session_id');

    const out = async () => {
        try {
            await outAuthSession({
                session_id: `${session}`
            }).unwrap();
            localStorage.removeItem('session_id');
            dispatch(setAuth(false));
            dispatch(setSession_id(''));
            dispatch(setUser(userInitial));
            dispatch(setToken(''));

        } catch (err: any) {
            console.log(err);
            throw err;
        }
    };

    const getUser = async () => {
        try {
            if (session) {
                const res = await getUserData(session);
                dispatch(setUser(res.data));
                dispatch(setAuth(true));
            }

        } catch (err) {
            console.log(err);
            if (session) {
                localStorage.removeItem('session_id');
            }
            throw err;

        }
    };

    const getToken = async () => {
        try {
            const res = await getAuthToken('');
            dispatch(setToken(res?.data?.request_token))
            return res?.data?.request_token;

        } catch (err) {
            console.log(err);
            throw err;
        }


    };

    const getSession = async (token: any) => {
        try {
            if (token) {
                const res = await getAuthSession({
                    request_token: `${token}`
                }).unwrap();
                dispatch(setAuth(true));
                localStorage.setItem('session_id', `${res.session_id}`)
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const verifyToken = async (body: IBodyValidateToken) => {
        try {

            await validateToken(body).unwrap();

        } catch (err) {
            console.log(err);
            dispatch(setToken(''));
            throw err;
        }
    };


    return {
        out, getUser, verifyToken,getSession,getToken
    }

};



