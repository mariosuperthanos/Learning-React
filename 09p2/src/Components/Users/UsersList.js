import Card from "../UI/Card";
import styles from './UserList.module.css'

const UsersList = ({ users }) => {
  return (
    <Card className={styles['users']}>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            {user["username"]} ({user["age"]} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
