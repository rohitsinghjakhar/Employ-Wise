import React, { useState, useEffect } from "react";
import "../assets/UserListStyle.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);

  //  Fetch Users from API
  const fetchUsers = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  //  Handle Delete User
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully!");

        // Remove the user from the list
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);

        // If page is empty after delete, fetch new data
        if (updatedUsers.length === 0 && page > 1) {
          setPage(page - 1);
        }
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Handle Edit User
  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  // Handle Update User
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingUser),
        }
      );

      if (response.ok) {
        alert("User updated successfully!");

        // Update user in the list
        setUsers(
          users.map((user) => (user.id === editingUser.id ? editingUser : user))
        );

        setEditingUser(null);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      <div className="user-container">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>Email: {user.email}</p>
              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/*  Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              value={editingUser.first_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, first_name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingUser.last_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, last_name: e.target.value })
              }
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
