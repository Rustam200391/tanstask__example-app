import React, { useState } from "react";
import PropTypes from "prop-types";
// npm install --save prop-types
import { useQuery } from "@tanstack/react-query";
import "./FetchUsers.css";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // https://jsonplaceholder.typicode.com/usershttps://jsonplaceholder.typicode.com/users - api

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const json = await response.json();
  return json;
}

const UserDetails = ({ user }) => (
  <div className="user-details">
    <h2>{user.name}</h2>
    <p>
      <strong>Username:</strong> {user.username}
    </p>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Phone:</strong> {user.phone}
    </p>
    <p>
      <strong>Website:</strong> {user.website}
    </p>
    <p>
      <strong>Company:</strong> {user.company.name}
    </p>
    <p>
      <strong>Address:</strong>{" "}
      {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
    </p>
    <button onClick={() => window.location.reload()}>Back</button>
  </div>
);

//здесь применяем propTypes
UserDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const FetchUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для хранения выбранного пользователя

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"], // Уникальный ключ
    queryFn: fetchUsers, // Функция, выполняющая запрос
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // Если выбран пользователь, отображаем информацию о нем
  if (selectedUser) {
    return <UserDetails user={selectedUser} />;
  }

  // Если данные успешно получены, отображаем список пользователей
  return (
    <div className="user-list-container">
      <ul className="user-list">
        {users?.map((user) => (
          <li
            key={user.id}
            className="user-item"
            onClick={() => setSelectedUser(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
