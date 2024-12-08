import React from 'react';
import AdminLayout from "../adminLayout/admin-layout.jsx";
import AdminServiceComponent from "../ServiceList/admin-service-component.jsx";

const AdminServicePage = () => {
    return (
        <AdminLayout>
            <AdminServiceComponent />
        </AdminLayout>
    );
};

export default AdminServicePage;