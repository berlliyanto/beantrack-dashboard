import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import addIotService from '../../../services/iot/addIot';
import { useQueryClient } from '@tanstack/react-query';

interface ResponsiveDialogInterface{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    handleClose: () => void;
    title: string;
}

const  ResponsiveDialog: React.FC<ResponsiveDialogInterface> = ({open, handleClose, setOpen, title}) => {
    const queryClient = useQueryClient();
    const token = useSelector((state: any) => state.token);
    const [name, setName] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const { mutate } = addIotService(
        (success) => {
            queryClient.invalidateQueries({queryKey: ['getAllIot']})
            setOpen(false);
        },
        (error) => {
            console.log(error)
        },
        token
    )

    const handleAdd = () => {
        if(!name || !code){
            return;
        }
        mutate({name, code})
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className='text-slate-800'>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-2 md:w-80 xl:w-96'>
                        <TextField type='text' name='namaMesin' id='namaMesin' placeholder='Nama mesin' onChange={(e) => setName(e.target.value)}/>
                        <TextField type='text' name='code' id='code' placeholder='Kode mesin' onChange={(e) => setCode(e.target.value)}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: 'red'}}>
                        Batalkan
                    </Button>
                    <Button onClick={handleAdd} sx={{color: '#3A7358'}}>
                        Tambah
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ResponsiveDialog;