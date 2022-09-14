import { deleteUser } from "@firebase/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AlertDismissible from "../../shared/Alert";

import Header from "../../shared/Header";

import "./style.css";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const blockUser = async (uid) => {
    try {
      await axios.post("https://foodlab-server.herokuapp.com/profile/block", { uid });
      fetchUsers();
      console.log(users);
      
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://foodlab-server.herokuapp.com/profile/all");
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-users_container">
      <Header />
      <div className="manage-users_content">
        <div className="manage-users_header">
          <h1 className="admin-heading">Manage Users</h1>
        </div>
        <Table striped bordered hover className="manage-user_table">
          <thead>
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(users).map(([id, user], index) => (
              <tr key={id}>
                <td>{index+1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant={user.blocked ? 'success': "danger"}
                    style={{ marginRight: "10px" }}
                    onClick={() => blockUser(id)}
                  >
                    <i className={`bi bi-${user.blocked ? 'play':'stop'}-circle-fill`}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AlertDismissible
        open={message}
        onClose={() => setMessage("")}
        text={message}
        variant={type}
      />
    </div>
  );
};
