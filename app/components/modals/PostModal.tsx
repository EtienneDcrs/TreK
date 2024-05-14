'use client';

import usePostModal from "@/app/hooks/usePostModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import FileInput from "../inputs/FileInput";
import Map from "../map/Map";
import { getCoordinatesFromGPX } from "@/app/actions/getCoordinates";
import { useMap } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";
import { watch } from "fs";

enum STEPS {
    FILE=0,
    DESCRIPTION=1
}

const PostModal = () => {
    const postModal = usePostModal();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ step, setStep ] = useState(STEPS.FILE);
    const [coordinates, setCoordinates] = useState<[number, number][]>([]);
    const [center, setCenter] = useState<[number,number]>([46.9119382485954, 2.2651793849164115]); //[43.68169106,3.84768334]
    
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("New file selected")
        const file = event.target.files![0];
        
        getCoordinatesFromGPX(file).then((coords) => {
            // Map over the coords to create an array of [lat, lng] pairs
            const latLngs: [number, number][] = coords.map(coord => [coord.lat, coord.lng]);
            setCoordinates(latLngs);
            setCenter(latLngs[Math.floor(latLngs.length / 2)]); 
        });
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }
    const onPrev = () => {
        setStep((value) => value - 1);
    }
    
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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            createdAt: new Date().toISOString(),
            published: false,
            authorId: "1",
            lats: [],
            lngs: [],
            elevations: [],
            category:"",
            length:"",
            duration:"",
            difficulty:"",
        },
    });

    const title = watch("title");
    const description = watch("description");
    const createdAt = watch("createdAt");
    const published = watch("published");
    const authorId = watch("authorId");
    const lats = watch("lats");
    const lngs = watch("lngs");
    const elevations = watch("elevations");
    const category = watch("category");
    const length = watch("length");
    const duration = watch("duration");
    const difficulty = watch("difficulty");

    const setCustomValue = (name: string, value: any) => {
        setValue(name, value, { shouldValidate: true });
    }

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
                        acceptedFileTypes=".gpx"
                        className="centered"
                        onChange={handleFileChange}
                    />
                    <div className="w-full">
                        <Map 
                            className="leaflet-post-map"
                            polyline={coordinates}
                            center={center}
                        />
                    </div>
                </div>

            </div>
        </div>
    )

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
                    <textarea name="description" id="desc" cols={30} rows={10}
                        className="border-2 w-full border-neutral-300 rounded-md p-3 outline-none transition focus:border-black"
                        placeholder="Description du parcours"
                    >
                    </textarea>
                </div>
            </div>
        )
    }

    return (
        <Modal 
            isOpen={postModal.isOpen}
            onClose={postModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.DESCRIPTION ? onPrev : undefined} 
            title="Create a new post"
            body={bodyContent}
        />
    );
}

export default PostModal;