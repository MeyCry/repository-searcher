export interface Repository {
    id: number;
    forks: number;
    created_at: string;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    }
    name: string
    full_name: string;
    url: string;
    html_url: string;
    watchers: number;
    stargazers_count: number;
}

export default class RepositoryModel {
    id: number;
    name: string;
    fullName: string;
    created_at: string;
    language: string;
    url: string;
    watchers: number;
    forks: number;
    userName: string;
    avatarUrl: string;
    stars: number;

    constructor(repository: Repository) {
        this.id = repository.id;
        this.name = repository.name;
        this.fullName = repository.full_name;
        this.url = repository.html_url;
        this.language = repository.language;
        this.watchers = repository.watchers;
        this.created_at = repository.created_at;
        this.forks = repository.forks;
        this.userName = repository.owner.login;
        this.avatarUrl = repository.owner.avatar_url;
        this.stars = repository.stargazers_count;
    }
}
