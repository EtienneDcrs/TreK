"use client";

import { on } from "events";

interface FileInputProps {
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    acceptedFileTypes?: string;
    className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
    // onChange,
    title,
    acceptedFileTypes,
    className,
}) => {
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = event.target.files;
    //     //onChange(files);
    // };

    return (
        <div className={`${className} p-2`}>
            <label
                htmlFor="fileInput"
                className="cursor-pointer bg-gray-400 shadow-md hover:shadow-lg rounded-md px-2 py-1 text-sm font-semibold text-neutral-900 hover:text-white"
            >
                {title}
            </label>
            <input
                //onChange={onChange}
                type="file"
                id="fileInput"
                accept={acceptedFileTypes}
                className="hidden"
            />
        </div>
    );
};

export default FileInput;
