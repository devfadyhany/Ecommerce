import { useState, useEffect } from "react";
import UsersTable from "../components/ui/UserTable";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  useEffect(() => {
    const dataUsers = () => {
      const data = [
        {
          id: "1",
          name: "ahmed",
          email: "ahmed@gmail.com",
          role: "admin",
          isVerified: true,
        },
        {
          id: "2",
          name: "abdo",
          email: "abdelrashmandahmfeddrev@gmail.com",
          role: "customer",
          isVerified: false,
        },
        {
          id: "3",
          name: "abdo aser",
          email: "abdelrashmandahmeddev@gmail.com",
          role: "admin",
          isVerified: true,
        },
        {
          id: "4",
          name: "abdo",
          email: "abdelrahmandahmeddev@gmail.com",
          role: "customer",
          isVerified: true,
        },
        {
          id: "5",
          name: "sayed",
          email: "sayedss@gmail.com",
          role: "customer",
          isVerified: false,
        },
        {
          id: "6",
          name: "nourhan",
          email: "nourhanmohamed@gmail.com",
          role: "admin",
          isVerified: false,
        },
        {
          id: "7",
          name: "sarah",
          email: "sarah@gmail.com",
          role: "admin",
          isVerified: false,
        },
        {
          id: "8",
          name: "jasmine",
          email: "jasmineengineer@gmail.com",
          role: "customer",
          isVerified: true,
        },
         {
          id: "9",
          name: "moaz",
          email: "moazdev@gmail.com",
          role: "admin",
          isVerified: true,
        },
         {
          id: "10",
          name: "yasser",
          email: "yasser@gmail.com",
          role: "admin",
          isVerified: false,
        },
      ];
      setUsers(data);
      setLoading(false);
    };

    dataUsers();
  }, );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentDisplayedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleToggleVerify = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, isVerified: !user.isVerified } : user
      )
    );
  };

  const handleEdit = (userId) => {
    console.log("Editing user:", userId);
  };

  const handleDelete = (userToDelete) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${userToDelete.name}?`);
    if (confirmed) {
      setUsers((prev) => prev.filter((user) => user._id !== userToDelete._id));
      
      if (currentDisplayedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink mb-1">Users</h1>
          <p className="text-sm text-ink-soft">Manage user accounts and roles.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-ink-soft">Loading users...</div>
      ) : (
        <UsersTable
          users={currentDisplayedUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleVerify={handleToggleVerify} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Users;