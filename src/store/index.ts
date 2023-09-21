import { makeAutoObservable } from "mobx";
import { TRepository } from "../types";

class FavoritesStore {
  favoriteRepositories: TRepository[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToFavorites(repository: TRepository) {
    if (!this.favoriteRepositories.some((repo) => repo.id === repository.id)) {
      this.favoriteRepositories.push(repository);
    }
  }

  removeFromFavorites(repository: TRepository) {
    this.favoriteRepositories = this.favoriteRepositories.filter(
      (repo) => repo.id !== repository.id
    );
  }
}

export const favoritesStore = new FavoritesStore();
