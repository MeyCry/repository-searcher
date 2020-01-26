import * as React from 'react';
import RepositoryModel from '../../helpers/repositoryModel';
import normalizeNumber from '../../helpers/normalizeNumber';
import './style.scss';

type Props = {
    item: RepositoryModel
}
export default function (props: Props) {
    const {
        name,
        fullName,
        avatarUrl,
        userName,
        created_at,
        forks,
        language,
        url,
        stars,
        watchers
    } = props.item;
    const createdTime = new Date(created_at);
    const MM = normalizeNumber(createdTime.getMonth() + 1);
    const DD = normalizeNumber(createdTime.getDate());
    const YY = createdTime.getFullYear();
    const hours = normalizeNumber(createdTime.getHours());
    const minutes = normalizeNumber(createdTime.getMinutes());

    return (
        <div className="list-item">
            <div className="list-item__user-info">
                <img
                    width={46}
                    height={46}
                    src={avatarUrl}
                    alt={userName}
                    className="list-item__user-avatar"/>
                <span className="list-item__user-name" title={userName}>
                    {userName}
                </span>
            </div>
            <div className="list-item__repository-info">
                <div className="list-item__repository-info-wrap">
                    <h3 className="list-item__title" title={fullName}>{name}</h3>
                    <time className="list-item__time" dateTime={created_at}>
                        {DD}-{MM}-{YY} {hours}:{minutes}
                    </time>
                    <span className="list-item__language">{language}</span>

                    <table className="list-item__table-info">
                        <thead>
                        <tr>
                            <th>Stars</th>
                            <th>Watchers</th>
                            <th>Forks</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{stars}</td>
                            <td>{watchers}</td>
                            <td>{forks}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <a href={url} target="_blank" className="list-item__link">
                    Open on GitHub
                </a>
            </div>
        </div>
    );
}
