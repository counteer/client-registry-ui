// VehicleList.tsx
import React, {useEffect, useState} from 'react';
import {Client} from '../api/Client.ts';
import './style/ClientList.css'
import AddressTable from "./AddressTable.tsx";
import PhoneTable from "./PhoneTable.tsx";
import ClientField from "./ClientField.tsx";
import {FaEdit, FaSave, FaEye, FaPlus, FaPowerOff} from "react-icons/fa";

interface ClientListProps {

}

const ClientList: React.FC<ClientListProps> = ({}) => {
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const onRowClick = (itemId: number | null) => {
        if (itemId === selectedItemId) {
            setSelectedItemId(null);
        } else {
            setSelectedItemId(itemId);
        }
    };
    const loadData = () => fetch('http://localhost:8080/clients')
        .then(response => response.json())
        .then(data => setClients(data))
        .catch(error => {
            setClients([]);
            console.error('Error fetching data:', error);
        });

    const emptyClient = {
        id: null,
        name: "",
        mothers_name: "",
        birth_date: "",
        birth_place: "",
        email_address: "",
        social_security_number: "",
        phone_numbers: [],
        addresses: []
    }
    const [clients, setClients] = useState<Client[]>([]);
    const [editField, setEditField] = useState<number | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const handleEditClick = (itemId: number | null) => {
        if (editField === itemId) {
            setEditing(false);
            setSelectedItemId(null);
        } else {
            setEditField(itemId);
            setEditing(true);
            setSelectedItemId(itemId);
        }
    };

    const insertNew = () => {
        setClients([emptyClient, ...clients]);
        setEditing(true);
        setSelectedItemId(null);
    }

    const handleCancel = () => {
        if (selectedItemId === null) {
            setClients(clients.filter((client) => client.id !== null));
        }
        setEditing(false);
        setSelectedItemId(null);
        setEditField(null);
    }

    const handleAddressDelete = (itemId: number | null, addressId: number | null) => {
        const newClients = clients.map((client) => {
            if (client.id === itemId) {
                client.addresses = client.addresses.filter((address) => (address.id !== addressId))
            }
            return client;
        });
        setClients(newClients);
    }

    const handleSave = (itemId: number | null) => {
        const toSave = clients.find((client) => {
            return client.id === itemId
        });
        const data = JSON.stringify(toSave);
        const saveData = () => fetch('http://localhost:8080/clients', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: data
        })
            .catch(error => {
                setClients([]);
                console.error('Error fetching data:', error);
            });
        saveData().then(() => loadData()).then(() => setEditField(null)).then(() => setEditing(false)).then(() => setSelectedItemId(null));
        return;
    };

    const handleValueChange = (index: number | null, fieldName: string, newValue: string) => {
        const newClients = clients.map((client) => {
            if (client.id === index) {
                return {...client, [fieldName]: newValue};
            }
            return client;
        });
        setClients(newClients);
    };

    const handlePhoneValueChange = (index: number | null, fieldName: string, newValue: string, phoneId: number | null) => {
        const newClients = clients.map((client) => {
            if (client.id === index) {
                client.phone_numbers = client.phone_numbers.map((phone_number) => {
                    if (phone_number.id === phoneId) {
                        return {...phone_number, [fieldName]: newValue};
                    } else {
                        return {...phone_number};
                    }
                })
            }
            return client;
        });
        setClients(newClients);
    };

    const handleAddressValueChange = (index: number | null, fieldName: string, newValue: string, phoneId: number | null) => {
        const newClients = clients.map((client) => {
            if (client.id === index) {
                client.addresses = client.addresses.map((address) => {
                    if (address.id === phoneId) {
                        return {...address, [fieldName]: newValue};
                    } else {
                        return {...address};
                    }
                })
            }
            return client;
        });
        setClients(newClients);
    };

    useEffect(() => {
        loadData();
    }, []);

    const emptyList = clients.length === 0;
    return (
        <div className="table-container">
            {!emptyList ?
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>Mother's Name</th>
                        <th>Email Address</th>
                        <th>Social Security Number</th>
                        <th>Birth date</th>
                        <th>Birth place</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        {editing ? <th></th> : <th onClick={() => insertNew()}><FaPlus/></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(item => (
                        [<tr key={item.id} style={{cursor: 'pointer'}}
                             className={selectedItemId == item.id ? "selected" : ""}>
                            <td>{item.id}</td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange} data={item.name}
                                             editing={editField === item.id} fieldName="name"/></td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange} data={item.mothers_name}
                                             editing={editField === item.id} fieldName="mothers_name"/></td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange} data={item.email_address}
                                             editing={editField === item.id} fieldName="email_address"/></td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange}
                                             data={item.social_security_number} editing={editField === item.id}
                                             fieldName="social_security_number"/></td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange} data={item.birth_date}
                                             editing={editField === item.id} fieldName="birth_date"/></td>
                            <td><ClientField itemId={item.id} handleChange={handleValueChange} data={item.birth_place}
                                             editing={editField === item.id} fieldName="birth_place"/></td>
                            {editField === item.id ? <td onClick={() => handleSave(item.id)}><FaSave/></td> : <td></td>}
                            {editing ? <td></td> : <td onClick={() => handleEditClick(item.id)}><FaEdit/></td>}
                            {(editing && editField === item.id) ?
                                <td onClick={() => handleCancel()}><FaPowerOff/></td> : <td></td>}
                            {editing ? <td></td> : <td onClick={() => onRowClick(item.id)}><FaEye/></td>}
                        </tr>,
                            selectedItemId == item.id ? <tr>
                                <td colSpan={2}>
                                    <PhoneTable itemId={item.id} handleChange={handlePhoneValueChange}
                                                phones={item.phone_numbers} editing={editField === item.id}/>

                                </td>
                                <td colSpan={4}>
                                    <AddressTable itemId={item.id} handleChange={handleAddressValueChange}
                                                  handleDelete={handleAddressDelete}
                                                  addresses={item.addresses} editing={editField === item.id}/>
                                </td>

                            </tr> : null]

                    ))}
                    </tbody>
                </table>
                : <div>No data</div>}
        </div>
    );
};

export default ClientList;
