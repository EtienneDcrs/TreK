"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client"; // Importation de socket.io-client
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { v4 as uuidv4 } from "uuid"; // Importation de uuid

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import FileInput from "../inputs/FileInput";
import CategoryInput from "../inputs/CategoryInput";
import DifficultyInput from "../inputs/DifficultyInput";
import usePostModal from "@/app/hooks/usePostModal";
import {
    getCoordinatesFromGPX,
    getCoordinatesFromKML,
} from "@/app/actions/getCoordinates";
import { getRouteLength } from "@/app/actions/getRouteLength";
import { SafeUser } from "@/app/types";

// import the icons for the categories
import { FaMountain, FaUmbrellaBeach } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { GiBoatFishing, GiCaveEntrance, GiWindmill } from "react-icons/gi";
import { FaMountainCity, FaQuestion } from "react-icons/fa6";

// Enum for the steps of the modal
enum STEPS {
    FILE = 0,
    CATEGORY = 1,
    DIFFICULTY = 2,
    DESCRIPTION = 3,
}

// Array of categories
export const categories = [
    {
        label: "Montagne",
        descritpion: "Randonnée en montagne",
        icon: FaMountain,
    },
    {
        label: "Forêt",
        descritpion: "Randonnée en forêt",
        icon: MdForest,
    },
    {
        label: "Campagne",
        descritpion: "Randonnée en campagne",
        icon: GiWindmill,
    },
    {
        label: "Ville",
        descritpion: "Randonnée en ville",
        icon: FaMountainCity,
    },
    {
        label: "Lac",
        descritpion: "Randonnée autour d'un lac",
        icon: GiBoatFishing,
    },
    {
        label: "Plage",
        descritpion: "Randonnée en bord de mer",
        icon: FaUmbrellaBeach,
    },
    {
        label: "Grotte",
        descritpion: "Randonnée en grotte",
        icon: GiCaveEntrance,
    },
    {
        label: "Autre",
        descritpion: "Autre type de randonnée",
        icon: FaQuestion,
    },
];

// Array of difficulties
export const difficulties = [
    {
        label: "Facile",
        color: "green",
    },
    {
        label: "Moyen",
        color: "yellow",
    },
    {
        label: "Difficile",
        color: "orange",
    },
    {
        label: "Expert",
        color: "red",
    },
];

interface PostModalProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
    currentUser: SafeUser;
}

const PostModal: React.FC<PostModalProps> = ({ socket, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.FILE); // State for the step of the modal
    const postModal = usePostModal();
    const router = useRouter();
    const polyline: [number, number][] = [];
    // Arrays to store the coordinates and elevation
    // Will be used to calculate the length of the route
    const lat: number[] = [];
    const lng: number[] = [];
    const ele: number[] = [];

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            // uuidv4(),
            id: crypto // create an id for the post
                .randomUUID()
                .toString()
                .replace(/-/g, "") // remove the dashes and keep only the first
                .substring(0, 24), // 24 characters to fit the MongoDB ObjectId
            title: "",
            description: "",
            authorId: currentUser?.id,
            lats: [],
            lngs: [],
            elevations: [],
            category: "",
            length: 0,
            difficulty: "",
        },
    });

    // Function to set the value of a custom field
    const setCustomValue = (name: string, value: any) => {
        setValue(name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Function to handle the file change
        const file = event.target.files![0]; // force unwrap the file bc we know it exists

        if (file.name.split(".").pop() === "gpx") {
            // check if the file is a GPX file
            const coords = await getCoordinatesFromGPX(file); // get the coordinates from the GPX file
            for (let i = 0; i < coords.lat.length; i++) {
                // loop through the coordinates to create a polyline
                polyline.push([coords.lat[i], coords.lng[i]]);
                // and store the latitude, longitude and elevation
                lat.push(coords.lat[i]);
                lng.push(coords.lng[i]);
                ele.push(coords.ele[i]);
            }
        } else if (file.name.split(".").pop() === "kml") {
            // check if the file is a KML file
            const coords = await getCoordinatesFromKML(file); // get the coordinates from the KML file
            for (let i = 0; i < coords.lat.length; i++) {
                // loop through the coordinates to create a polyline
                polyline.push([coords.lat[i], coords.lng[i]]);
                // and store the latitude, longitude and elevation
                lat.push(coords.lat[i]);
                lng.push(coords.lng[i]);
                ele.push(coords.ele[i]);
            }
        }

        const length = getRouteLength(polyline); // calculate the length of the route
        // set the values of the custom fields
        setCustomValue("length", length);
        setCustomValue("lats", lat);
        setCustomValue("lngs", lng);
        setCustomValue("elevations", ele);
    };

    const onNext = () => {
        // go to the next step
        setStep((value) => value + 1);
    };
    const onPrev = () => {
        // go to the previous step
        setStep((value) => value - 1);
    };

    const actionLabel = useMemo(() => {
        // if it's the last step, change the label to "Create"
        if (step === STEPS.DESCRIPTION) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        // if it's the first step, don't display the secondary action (back button)
        if (step === STEPS.FILE) {
            return undefined;
        }
        return "Back";
    }, [step]);

    const category = watch("category");
    const difficulty = watch("difficulty");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // if it's not the last step, go to the next step
        if (step !== STEPS.DESCRIPTION) {
            return onNext();
        }
        setIsLoading(true);

        // send the data to the server via socket.io
        try {
            socket?.emit("newPost", data);
            toast.success("Post créé !");
            router.refresh();
        } catch (error) {
            toast.error("Une erreur s'est produite");
        }

        reset();
        setStep(STEPS.FILE); // reset the step to the first one
        postModal.onClose();
        setIsLoading(false);
    };

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-4">
                <Heading
                    title="Partagez une nouvelle randonnée !"
                    subtitle="Commencez par ajouter le tracé de votre randonnée"
                />
                <div className="flex flex-col items-center gap-4">
                    <FileInput
                        title="Ajouter un parcours"
                        acceptedFileTypes=".gpx , .kml" // accept only GPX and KML files
                        className="centered"
                        onChange={handleFileChange}
                    />
                    <div className="w-full">map not yet available</div>
                </div>
            </div>
        </div>
    );

    if (step === STEPS.CATEGORY) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Partagez une nouvelle randonnée !"
                    subtitle="Définissez la catégorie qui correspond à votre randonnée"
                />
                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto"
                >
                    {categories.map(
                        (
                            item // loop through the categories to display them
                        ) => (
                            <div key={item.label} className="col-span-1">
                                <CategoryInput
                                    onClick={(category) => {
                                        setCustomValue("category", category);
                                    }}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
    if (step === STEPS.DIFFICULTY) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Partagez une nouvelle randonnée !"
                    subtitle="Définnissez la difficulté et longueur de votre randonnée"
                />
                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto"
                >
                    {difficulties.map(
                        (
                            item // loop through the difficulties to display them
                        ) => (
                            <div key={item.label} className="col-span-1">
                                <DifficultyInput
                                    onClick={(difficulty) => {
                                        setCustomValue(
                                            "difficulty",
                                            difficulty
                                        );
                                    }}
                                    selected={difficulty === item.label}
                                    label={item.label}
                                    color={item.color}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div>
                <div className="flex flex-col gap-4">
                    <Heading
                        title="Partagez une nouvelle randonnée !"
                        subtitle="Ajoutez un titre et une description à votre randonnée"
                    />
                    <Input
                        id="title"
                        label="Nom de la randonnée"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="description"
                        label="Description de la randonnée"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
            </div>
        );
    }

    return (
        <Modal
            isOpen={postModal.isOpen}
            onClose={postModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.FILE ? undefined : onPrev} // if it's the first step, don't display the secondary action
            title="Create a new post"
            body={bodyContent}
        />
    );
};

export default PostModal;
