import RepositoryCard from "./RepositoryCard";
import { TRepository } from "../types";
import { observer } from "mobx-react-lite";

type RepositoriesListProps = {
  data: TRepository[] | undefined;
};

const RepositoriesList = ({ data }: RepositoriesListProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-5">
      {data?.map((rep) => (
        <RepositoryCard key={rep.id} item={rep} />
      ))}
    </div>
  );
};

export default observer(RepositoriesList);
