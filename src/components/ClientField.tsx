import React from "react";

interface ClientFieldProps {
    data: any;
    itemId: number|null;
    editing: boolean;
    handleChange: (itemId: number|null, fieldName: string, newValue: string) => void;
    fieldName: string;
}

const ClientField: React.FC<ClientFieldProps> = ({data, editing, handleChange, fieldName, itemId}) => {

    return (editing ? <input type="text" value={data}
                             onChange={(newValue) => handleChange(itemId, fieldName, newValue.target.value )}/> :
        <span>{data}</span>);

}

export default ClientField;
