import React, {useTransition, useEffect, useState} from "react";
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from "@mui/material/Slide";
import Box from '@mui/material/Box'
import Loader from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { TransitionProps } from "@mui/material/transitions";
// @tanstack/query
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { userMailingURL } from "~/constants";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>; }, ref: React.Ref<unknown>,)  {
    return <Slide direction="down" ref={ref} {...props}>
            {props.children}
        </Slide>;
});

export function ModalNewsletter() {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<unknown>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        setOpen(true)
    }, []);

    const handleClose = () => {
        startTransition(() => {
            setOpen(false);
        })
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setIsSuccess(false);

        try {
            await fetch(userMailingURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            setIsSuccess(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <React.Fragment>
            <Dialog open={open} slots={{
                transition: Transition,
            }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    Stay in touch!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Receive new fashion trends in your mailbox. You can unsubscribe at any moment. Press ESC key or click the button below to close
                    </DialogContentText>
                    <Box component="form" sx={{ '& .MuiTextField-root':{m: 1, width: '25ch'} }} autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                required
                                label="E-mail address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" />
                        </div>
                        <div>
                            <Button type="submit">
                                {isSubmitting? <Loader /> : 'Subscribe'}
                            </Button>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}