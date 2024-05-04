'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

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
            .post("/api/register", data)
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                RegisterModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }; 

    const bodyContent = (
        <div
            className="flex flex-col gap-3"
        >
            <Heading 
                title="Bienvenue !"
                subtitle="Créez votre compte !"
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> 
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> 
            <Input 
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> 
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-3">
            <hr />
            <Button 
                outline
                label="Continue with Google" 
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label="Continue with Github" 
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div
                className="text-neutral-500 text-center font-light"
            >
                <div
                    className="flex flex-row justify-center items-center gap-2"
                    >
                    <div>
                        Already have an account ? 
                    </div>
                    <div onClick={RegisterModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
    
    return(
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;