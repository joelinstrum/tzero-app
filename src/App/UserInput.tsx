import React, { useEffect, useState } from "react";

interface UserInputProps {
  label: string;
  defaultValue: string;
  propKey: string;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({
  label,
  defaultValue,
  disabled,
  propKey,
}) => {
  const [val, setVal] = useState("");
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };

  useEffect(() => {
    if (disabled) {
      setVal("...");
    } else {
      setVal(defaultValue);
    }
  }, [disabled, defaultValue]);

  return (
    <div className="App-user-row">
      <div>{label}:</div>
      <div>
        <input
          type="text"
          value={val}
          onChange={changeHandler}
          disabled={disabled}
          name={propKey}
        />
      </div>
    </div>
  );
};

export default UserInput;
