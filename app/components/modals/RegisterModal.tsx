'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [ isLoading, setIsLoading ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post("/api/auth/register", data)
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                RegisterModal.onClose();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }; 

    const bodyContent = (
        <div
            className="flex flex-col gap-4"
        >
            <Heading 
                title="Bienvenue !"
                subtitle="Créez votre compte !"
            />
        </div>
    )
    
    return(
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Continue"
        />
    );
};

export default RegisterModal;