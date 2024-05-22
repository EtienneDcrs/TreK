"use client";

import { on } from "events";

interface FileInputProps {
    onChange?: any; // function that will be called when the file input changes
    title: string;
    acceptedFileTypes?: string;
    className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
    onChange,
    title,
    acceptedFileTypes,
    className,
}) => {
    return (
        <div className={`${className} p-2`}>
            <label
                htmlFor="fileInput" // link the label to the input
                className="cursor-pointer bg-gray-400 shadow-md hover:shadow-lg rounded-md px-2 py-1 text-sm font-semibold text-neutral-900 hover:text-white"
            >
                {title}
            </label>
            <input
                onChange={onChange}
                type="file"
                id="fileInput"
                accept={acceptedFileTypes}
                className="hidden" // hide the input to style the label
            />
        </div>
    );
};

export default FileInput;
