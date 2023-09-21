import { observer } from "mobx-react-lite";
import { favoritesStore } from "../store";
import { TRepository } from "../types";

import IconStar from "./icons/IconStar";
import IconFork from "./icons/IconFork";
import IconFavoriteEmpty from "./icons/IconFavoriteEmpty";
import IconFavoriteFill from "./icons/IconFavoriteFill";

interface RepositoryCardProps {
  item: TRepository;
}

const RepositoryCard = ({ item }: RepositoryCardProps) => {
  const isFavorite = favoritesStore.favoriteRepositories.includes(item);

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesStore.removeFromFavorites(item);
    } else {
      favoritesStore.addToFavorites(item);
    }
  };

  function formatNumber(value: number) {
    if (value >= 1000) {
      const formattedNumber = (value / 1000).toFixed(1);
      return `${formattedNumber} тыс`;
    }
    return value.toString();
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between border border-[#30363d] rounded-md p-4">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <img
            src={item.owner.avatar_url + "&quality=30"}
            alt="Лого репозитория"
            className="rounded-full"
            width={36}
            height={36}
          />
          <a
            href={item.html_url}
            className="text-[#2F81F7] text-lg sm:text-xl font-semibold line-clamp-1 cursor-pointer"
          >
            {item.full_name}
          </a>
        </div>
        <div className="mt-1">
          <p className="text-[#E6EDE3] text-sm line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex flex-wrap sm:space-x-2 mt-2 mb-2">
          {item?.topics?.slice(0, 5)?.map((topic) => (
            <div
              key={topic}
              className="py-1 px-2 rounded-full text-[#2F81F7] text-xs bg-[#388bfd1a] mt-2 max-sm:mr-2"
            >
              {topic}
            </div>
          ))}
        </div>
        <div className="flex flex-row space-x-2">
          <div className="flex">
            <IconStar />
            <span className="ml-1 text-xs text-[#7D8590]">
              {formatNumber(item.stargazers_count)}
            </span>
          </div>
          <div className="flex">
            <IconFork />
            <span className="text-xs text-[#7D8590]">
              {formatNumber(item.forks_count)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between max-sm:mt-4">
        <div className="flex justify-end text-[#E6EDE3] max-sm:hidden">
          <button className="cursor-pointer" onClick={toggleFavorite}>
            {isFavorite ? <IconFavoriteFill /> : <IconFavoriteEmpty />}
          </button>
        </div>
        <a
          href={item.html_url}
          className="bg-[#2F81F7] px-4 py-3 rounded-md text-sm text-[#E6EDE3] duration-200 hover:bg-[#2F81F7]/80"
          rel="noopener noreferrer"
        >
          Подробнее
        </a>
      </div>
    </div>
  );
};

export default observer(RepositoryCard);
