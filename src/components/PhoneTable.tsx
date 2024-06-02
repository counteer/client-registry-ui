import React from "react";
import {PhoneNumber} from "../api/Client.ts";
import Field from "./Field.tsx";

interface PhoneTableProps {
    phones: PhoneNumber[];
    editing: boolean;
    handleChange: (itemId: number|null, fieldName: string, newValue: string, phoneId:number|null) => void;
    itemId: number|null;
}

const PhoneTable: React.FC<PhoneTableProps> = ({phones, editing, handleChange, itemId}) => {

    return (<table>
        <thead>
        <tr>
            <td>Phone Number</td>
            <td></td>
        </tr>
        </thead>
        <tbody>
        {phones.map(phone => <tr>
            <td><Field itemId={itemId} handleChange={handleChange} editing={editing} data={phone.phone_number} fieldName="phone_number" subId={phone.id}/></td>
            <td onClick={() => alert("click")}>Delete</td>
        </tr>)}
        </tbody>
    </table>);
}

export default PhoneTable;

