import AdminLayout from "../adminLayout/admin-layout.jsx";
import AdminTeamCreateComponent from "../TeamList/admin-team-create-component.jsx";

const AdminCreateTeamPage = () => {
    return (
        <AdminLayout>
            <AdminTeamCreateComponent />
        </AdminLayout>
    );
};

export default AdminCreateTeamPage;