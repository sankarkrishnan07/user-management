import Table from "../../ui/components/Table";
import UserRow from "./UserRow";

export default function UsersTable({ users }: { users: any }) {
  return (
    <Table columns="repeat(5, 1fr)">
      <Table.Header>
        <span></span>
        <span>Email</span>
        <span>First Name</span>
        <span>Last Name</span>
        <span>Action</span>
      </Table.Header>

      <Table.Body
        data={users}
        render={(user: any) => <UserRow key={user.id} user={user} />}
      />
    </Table>
  );
}