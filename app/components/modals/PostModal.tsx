"use client";

import axios from "axios";
import usePostModal from "@/app/hooks/usePostModal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import FileInput from "../inputs/FileInput";
import CategoryInput from "../inputs/CategoryInput";
import DifficultyInput from "../inputs/DifficultyInput";
import {
    getCoordinatesFromGPX,
    getCoordinatesFromKML,
} from "@/app/actions/getCoordinates";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaMountain, FaUmbrellaBeach } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { GiBoatFishing, GiCaveEntrance, GiWindmill } from "react-icons/gi";
import { FaMountainCity, FaQuestion } from "react-icons/fa6";
import { getRouteLength } from "@/app/actions/getRouteLength";

enum STEPS {
    FILE = 0,
    CATEGORY = 1,
    DIFFICULTY = 2,
    DESCRIPTION = 3,
}

export const categories = [
    {
        label: "Montagne",
        descritpion: "Randonnée en montagne",
        icon: FaMountain,
    },
    {
        label: "Forêt", // Foret
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

const PostModal = () => {
    const postModal = usePostModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.FILE);
    const [center, setCenter] = useState<[number, number]>([
        46.9119382485954, 2.2651793849164115,
    ]); //[43.68169106,3.84768334]
    const polyline: [number, number][] = [];
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
            title: "",
            description: "",
            lats: [],
            lngs: [],
            elevations: [],
            category: "",
            length: 0,
            difficulty: "",
        },
    });

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
        console.log("New file selected");
        const file = event.target.files![0];
        console.log(file);
        if (!file) {
            return;
        } else if (file.name.split(".").pop() === "gpx") {
            const coords = await getCoordinatesFromGPX(file);
            for (let i = 0; i < coords.lat.length; i++) {
                polyline.push([coords.lat[i], coords.lng[i]]);
                lat.push(coords.lat[i]);
                lng.push(coords.lng[i]);
                ele.push(coords.ele[i]);
            }
        } else if (file.name.split(".").pop() === "kml") {
            const coords = await getCoordinatesFromKML(file);
            for (let i = 0; i < coords.lat.length; i++) {
                polyline.push([coords.lat[i], coords.lng[i]]);
                lat.push(coords.lat[i]);
                lng.push(coords.lng[i]);
                ele.push(coords.ele[i]);
            }
        }
        const length = getRouteLength(polyline);
        setCustomValue("length", length);
        setCustomValue("lats", lat);
        setCustomValue("lngs", lng);
        setCustomValue("elevations", ele);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };
    const onPrev = () => {
        setStep((value) => value - 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.FILE) {
            return undefined;
        }
        return "Back";
    }, [step]);

    const category = watch("category");
    const difficulty = watch("difficulty");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.DESCRIPTION) {
            return onNext();
        }
        setIsLoading(true);

        axios
            .post("api/posts", data)
            .then((response) => {
                const postId = response.data.id;
                toast.success("Post Created !");
                postModal.onClose();
                setStep(STEPS.FILE);
                router.refresh();
                reset();
                router.push(`/posts/${postId}`);
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                        acceptedFileTypes=".gpx , .kml"
                        className="centered"
                        onChange={handleFileChange}
                    />
                    <div className="w-full">
                        {/* <Map id="map2" /> */}
                        map
                    </div>
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
                    {categories.map((item) => (
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
                    ))}
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
                    {difficulties.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <DifficultyInput
                                onClick={(difficulty) => {
                                    setCustomValue("difficulty", difficulty);
                                }}
                                selected={difficulty === item.label}
                                label={item.label}
                                color={item.color}
                            />
                        </div>
                    ))}
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
            secondaryAction={step === STEPS.FILE ? undefined : onPrev}
            title="Create a new post"
            body={bodyContent}
        />
    );
};

export default PostModal;
