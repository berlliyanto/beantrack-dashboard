import { Add } from "@mui/icons-material";
import { Fragment, useState } from "react";
import ResponsiveDialog from "../Dialog/ResponsiveDialog";

const CardAddMesin = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <div onClick={handleClickOpen}
                className='h-16 min-w-[240px] p-3 rounded-md flex justify-between items-center cursor-pointer bg-primary duration-300 hover:bg-emerald-700 active:scale-95'>
                <div>
                    <h1 className="text-sm text-white">Tambah Mesin</h1>
                </div>
                <div>
                    <Add className="text-white" />
                </div>
            </div>
            <ResponsiveDialog open={open} handleClose={handleClose} setOpen={setOpen} title="Tambah Mesin Baru" />
        </Fragment>
    )
}

export default CardAddMesin;