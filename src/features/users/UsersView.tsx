import styled from "styled-components";
import Pagination from "../../ui/components/Pagination";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import { useDispatch, useSelector } from "react-redux";
import UsersCardView from "./UsersCardView";
import { fetchUserData, setCurPage } from "./userSlice";
import {
  RECORDS_PER_PAGE_TABLE,
  RECORDS_PER_PAGE_CARD,
} from "../../utils/constants";
import store from "../../store";
import toast from "react-hot-toast";

const StyledUsersView = styled.section`
  padding: 2rem;
`;

export default function UsersView() {
  const dispatch = useDispatch<any>();
  const users: any = useSelector((store) => (store as any).user);
  const {
    users: { data: userData },
    searchBy,
    view,
    status,
    error
  } = users;

  let { curPage } = users;

  const recordsPerPage =
    view === "table" ? RECORDS_PER_PAGE_TABLE : RECORDS_PER_PAGE_CARD;

  if(status === "error") {
    toast.error(error)
  }

  let data: Array<any> = [],
    filteredData = [],
    totalPages = 0;

  if (searchBy)
    filteredData = userData.filter((user: any) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchBy.toLowerCase())
    );

  if (userData) {
    data = (searchBy ? filteredData : userData).slice(
      (curPage - 1) * recordsPerPage,
      curPage * recordsPerPage
    );

    totalPages = Math.ceil(
      (searchBy ? filteredData : userData).length / recordsPerPage
    );
  }

  function handlePrevious() {
    dispatch(setCurPage(curPage > 1 ? curPage - 1 : 1));
  }

  function handleClick(pageNo: number) {
    dispatch(setCurPage(pageNo));
  }

  function handleNext() {
    dispatch(setCurPage(curPage < totalPages ? curPage + 1 : totalPages));
  }

  return (
    <StyledUsersView>
      <UsersHeader />
      {view === "table" ? (
        <UsersTable users={data} />
      ) : (
        <UsersCardView users={data} />
      )}
      {data.length ? (
        <Pagination
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleClick={handleClick}
          handleNext={handleNext}
          curPage={curPage}
        />
      ) : null}
    </StyledUsersView>
  );
}

export async function loader() {
  await store.dispatch(fetchUserData());
  return null;
}
