"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

// Modal to handle the login process
const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false); // state to handle the loading state

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        // initialize the react-hook-form with default values
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // function that handles the login when the form is submitted
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data, // pass the email and password to the signIn function
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                // if the login is successful
                toast.success("Logged in successfully"); // display a success pop-up using toast
                loginModal.onClose(); // close the login modal
                router.refresh();
            }

            if (callback?.error) {
                // if the login fails
                toast.error(callback.error); // display an error pop-up
            }
        });
    };

    const toggle = useCallback(() => {
        // function to toggle between the login and register modals
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = // content of the modal body
        (
            <div className="flex flex-col gap-3">
                <Heading
                    title="Heureux de vous revoir !"
                    subtitle="Connectez vous à votre compte !"
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

    const footerContent = // content of the modal footer
        (
            <div className="flex flex-col gap-3">
                <hr />
                <div className="text-neutral-500 text-center font-light">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div>Pas encore de compte ?</div>
                        <div
                            onClick={toggle} // on click, toggle between the login and register modals
                            className="text-neutral-800 cursor-pointer hover:underline"
                        >
                            Créez votre compte
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <Modal
            disabled={isLoading} // disable the modal when the form is loading
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
