import React from "react";
import {Address} from "../api/Client.ts";
import Field from "./Field.tsx";

interface AddressTableProps {
    addresses: Address[],
    editing: boolean;
    handleChange: (itemId: number|null, fieldName: string, newValue: string, addressId: number|null) => void;
    itemId: number|null;
    handleDelete: (clientId: number|null, addressId: number|null) => void;
}

const AddressTable: React.FC<AddressTableProps> = ({addresses, editing, handleChange, itemId, handleDelete}) => {

    return (<table>
        <thead>
        <tr>
            <td>Street</td>
            <td>City</td>
            <td>Postal Code</td>
            <td></td>
        </tr>
        </thead>
        <tbody>
        {addresses.map(address =>
            <tr>
                <td><Field itemId={itemId} handleChange={handleChange} data={address.street_address} editing={editing}
                           fieldName="street_address" subId={address.id}/></td>
                <td><Field itemId={itemId} handleChange={handleChange} data={address.city} editing={editing}
                           fieldName="city" subId={address.id}/></td>
                <td><Field itemId={itemId} handleChange={handleChange} data={address.postal_code} editing={editing}
                           fieldName="postal_code" subId={address.id}/></td>
                <td onClick={()=>handleDelete(itemId, address.id)}>Delete</td>
            </tr>)}
        </tbody>
    </table>);
}

export default AddressTable;

