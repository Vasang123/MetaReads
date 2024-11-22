import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { InputFileProps } from "../../../Props/inputFieldProps";

function FileInput({ onChange, name, initialFile }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currName, setCurrName] = useState("");

  const handleButtonClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleChangeFile = (e: any) => {
    onChange(e);
    setCurrName(e.target.files[0].name);
  };

  useEffect(() => {
    if (initialFile) {
      setCurrName(initialFile.name);

      const url = URL.createObjectURL(initialFile);

      return () => URL.revokeObjectURL(url);
    }
  }, [initialFile]);

  return (
    <div className="flex items-center">
      <div>
        <input
          name={name}
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={(e) => handleChangeFile(e)}
          className="hidden"
        ></input>
        <Button onClick={handleButtonClick}>Upload file</Button>
      </div>
      <div className="ml-2 text-[gray]">
        {currName ? currName : "Insert PDF File"}
      </div>
    </div>
  );
}

export default FileInput;
