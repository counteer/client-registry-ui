import React from "react";
import ClientList from "./ClientList.tsx";
import './style/Home.css'

const Home: React.FC = () => {
    return (
        <div>
            <h1>Clients</h1>
            <div className="container">
                <ClientList/>
            </div>
        </div>
    );
};

export default Home;
