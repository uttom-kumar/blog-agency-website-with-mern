import React from 'react';
import AdminLayout from "../adminLayout/admin-layout.jsx";
import AdminServiceCreateComponent from "../ServiceList/admin-service-create-Component.jsx";

const AdminServiceCreatePage = () => {
    return (
        <AdminLayout>
            <AdminServiceCreateComponent />
        </AdminLayout>
    );
};

export default AdminServiceCreatePage;