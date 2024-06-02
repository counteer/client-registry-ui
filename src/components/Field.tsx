import React from "react";

interface FieldProps {
    data: any;
    itemId: number|null;
    editing: boolean;
    handleChange: (itemId: number|null, fieldName: string, newValue: string, phoneId:number|null) => void;
    fieldName: string;
    subId: number;
}

const Field: React.FC<FieldProps> = ({data, editing, handleChange, fieldName, itemId, subId}) => {
    return (editing ? <input type="text" value={data}
                             onChange={(newValue) => handleChange(itemId, fieldName, newValue.target.value, subId )}/> :
        <span>{data}</span>);
}

export default Field;
