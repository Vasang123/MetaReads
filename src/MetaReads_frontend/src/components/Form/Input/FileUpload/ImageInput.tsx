import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { InputFileProps } from "../../../Props/inputFieldProps";

function ImageInput({ onChange, name, initialFile }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: any) => {
    onChange(e);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (initialFile) {
      const url = URL.createObjectURL(initialFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [initialFile]);

  return (
    <div className="flex items-center">
      <div>
        <input
          name={name}
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => handleChange(e)}
          className="hidden"
        ></input>
        <div onClick={handleButtonClick} className="hover:cursor-pointer">
          {previewUrl ? (
            <img
              src={previewUrl}
              className="flex h-[140px] w-[100px] rounded-md border-[1px] border-[gray] object-cover object-center"
            />
          ) : (
            <div className="flex h-[140px] w-[100px] items-center justify-center rounded-md border-2 border-[gray] text-[36px] text-[gray]">
              <div>+</div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div
          onClick={handleButtonClick}
          className="ml-2 text-[gray] hover:cursor-pointer"
        >
          Insert Cover Image
        </div>
        <div className="ml-2 text-[gray]">
          For the perfect display, choose 5 : 7 resolution
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
