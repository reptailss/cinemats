import {useAppDispatch} from "./hook";
import {setMessage, setOpenSnack, setVariant} from '../redux/slice/snackBarsSlice'



export const useSnackBar = (message: string,variant: 'success' | 'error' | 'warning' | 'info') => {
    const dispatch = useAppDispatch();
    dispatch(setMessage(message));
    dispatch(setVariant(variant));
    dispatch(setOpenSnack(true));
};