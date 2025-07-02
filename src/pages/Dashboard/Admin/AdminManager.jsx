import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminManager = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchEmail, setSearchEmail] = useState("");
  const [debounced, setDebounced] = useState("");

  // Debounce email input
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(searchEmail), 500);
    return () => clearTimeout(timeout);
  }, [searchEmail]);

  // Query users by email (partial match)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["searchUsers", debounced],
    enabled: !!debounced,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${debounced}`);
      return res.data.data;
    },
  });

  // Mutation: update user role using user ID
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      // console.log(id, role);
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["searchUsers"]);
      Swal.fire("Success", "User role updated", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      text: `Are you sure you want to make ${user.email} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        roleMutation.mutate({ id: user._id, role: newRole });
      }
    });
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔐 Admin Route Manager</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td className={`${user.role ==='admin'?"btn btn-xs mt-4 btn-accent":""}`}>{user.role}</td>
                  <td className="space-x-2">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleChange(user, "user")}
                        className="btn btn-sm btn-warning"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user, "admin")}
                        className="btn btn-sm btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
