import styled from "styled-components";
import UserCard from "./UserCard";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  max-width: 75rem;
  margin: auto;
`;

export default function UsersCardView({ users }: { users: any }) {
  return (
    <Cards>
      {users.map((user: any) => (
        <UserCard user={user} key={user.id} />
      ))}
    </Cards>
  );
}
