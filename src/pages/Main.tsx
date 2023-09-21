import { useQuery } from "react-query";
import { fetchGitHubData } from "../services/githubService";
import SearchInput from "../components/SearchInput";
import RepositoriesList from "../components/RepositoriesList";
import { favoritesStore } from "../store";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler, useState } from "react";

const Main = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data, isLoading, error } = useQuery(
    "githubData",
    () => {
      if (inputValue.trim() === "") {
        return [];
      } else {
        return fetchGitHubData({ query: inputValue });
      }
    },
    { enabled: inputValue.trim() !== "" }
  );

  const renderLoading = () => (
    <div className="w-full text-center mt-4 text-[#E6EDE3] text-lg">
      Загрузка...
    </div>
  );

  const renderError = () => (
    <div className="w-full text-center mt-4 text-[#E6EDE3] text-lg">
      При запросе произошла ошибка!
    </div>
  );

  const renderEmptyList = () => (
    <div className="text-xl font-medium">Список пуст!</div>
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log("Changed value:", event.target.value);
    fetchGitHubData({ query: event.target.value });
  };

  const renderData = () => {
    if (data?.length === 0) {
      return renderEmptyList();
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-8 pb-6">
        <div className="">
          <div className="text-lg sm:text-xl font-semibold text-[#E6EDE3]">
            Список репозиториев:
          </div>
          <div className="h-[1px] bg-[#30363d] w-full my-4"></div>
          <RepositoriesList data={data} />
        </div>
        <div className="max-lg:hidden">
          <div className="text-lg sm:text-xl font-semibold text-[#E6EDE3]">
            Список c избранными репозиториями:
          </div>
          <div className="h-[1px] bg-[#30363d] w-full my-4"></div>
          <RepositoriesList data={favoritesStore.favoriteRepositories} />
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 mx-auto max-w-screen-xl lg:px-6 w-full">
      <div className="my-6">
        <SearchInput handleChange={onChange} />
      </div>
      {isLoading ? renderLoading() : error ? renderError() : renderData()}
    </div>
  );
};

export default observer(Main);
