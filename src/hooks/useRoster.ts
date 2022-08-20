import {useAddItemRosterMutation, useNewRosterMutation, useRemoveItemRosterMutation,useDeleteRosterMutation} from '../services/MovieService'
import {useSnackBar} from "./useSnackBars";
import {setRosterId} from "../redux/slice/rosterSlice";
import {useAppDispatch} from "./hook";

export const useRoster = () => {

    const session_id = localStorage.getItem('session_id');

    const [addItemRoster] = useAddItemRosterMutation();
    const [removeItemRoster] = useRemoveItemRosterMutation();
    const [deleteRosterItem] = useDeleteRosterMutation();
    const [newRoster,] = useNewRosterMutation();

    const {setSnackBar} = useSnackBar();

    const dispatch = useAppDispatch();

    const addItemMovie = async (list_id: number | undefined, movie_id: number) => {

        if (session_id) {
            try {
                const res = await addItemRoster({
                    body: {media_id: movie_id},
                    params: {
                        session_id,
                        list_id
                    }

                });
                // @ts-ignore
                if (res?.data) {
                    setSnackBar('you have successfully added the movie to the list!', 'success');
                    // @ts-ignore
                } else if (res?.error) {
                    // @ts-ignore
                    setSnackBar(res?.error.data.status_message, 'error')
                }

            } catch (err) {
                console.log(err);
                throw err
            }

        }
    };

    const removeItemMovie = async (list_id: number | undefined, movie_id: number) => {

        if (session_id) {
            try {
                const res = await removeItemRoster({
                    body: {media_id: movie_id},
                    params: {
                        session_id,
                        list_id
                    }

                });
                // @ts-ignore
                if (res?.data) {
                    setSnackBar('you have successfully removed an item from the list!', 'info');
                    // @ts-ignore
                } else if (res?.error) {
                    // @ts-ignore
                    setSnackBar(res?.error.data.status_message, 'error')
                }

            } catch (err) {
                console.log(err);
                throw err
            }

        }
    };

    const deleteRoster = async (id: number) => {
        try {
            await deleteRosterItem({
                params:{
                    list_id: id,
                    session_id: session_id
                }
            });
            setSnackBar('you have successfully added the movie to the list!', 'success');
        }catch (err:any) {
            setSnackBar(err?.status_message, 'error')
        }

    };

    const addRoster = async (body: any) => {

        try {
            const res = await newRoster({
                body: {
                    ...body,
                    language: 'en',
                },
                params: {
                    session_id: session_id
                }
            });
            // @ts-ignore
            if (res.data) {
                setSnackBar('you have successfully added the list', 'success');
                // @ts-ignore
                dispatch(setRosterId(res?.data.list_id));
            }
            else{
                // @ts-ignore
                setSnackBar('error', 'error');
            }

        } catch (err: any) {
            setSnackBar(err.data.status_message, 'error');
            throw err;
        }
    };



    return {addItemMovie, removeItemMovie,deleteRoster,addRoster};


};


