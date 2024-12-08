import React from 'react';
import AdminLayout from "../adminLayout/admin-layout.jsx";
import AdminServiceUpdateComponent from "../ServiceList/admin-service-update-component.jsx";

const AdminServiceUpdatePage = () => {
    return (
        <AdminLayout>
            <AdminServiceUpdateComponent />
        </AdminLayout>
    );
};

export default AdminServiceUpdatePage;