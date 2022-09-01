import React, {
    FormEvent, useEffect, useRef, useState,
} from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

function HomePage() {
    const [value, setValue] = useState('');
    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownElement = useRef(null);
    const debounced = useDebounce(value);

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    });

    useEffect(() => {
        setIsDropdownOpen(debounced.length > 2 && data?.length! > 0);
    }, [debounced, data]);

    useEffect(() => {
        const clickHandler = (ev: MouseEvent) => {
            const isModalClick = ev.target === dropdownElement.current;
            setIsDropdownOpen(isModalClick);
        };

        if (isDropdownOpen) {
            document.addEventListener('click', clickHandler);
        }

        return () => document.removeEventListener('click', clickHandler);
    }, [isDropdownOpen]);

    const onInput = (event: FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const clickHandler = (username: string) => {
        fetchRepos(username);
        setUserName(username);
        setIsDropdownOpen(false);
    };

    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen flex-wrap'}>
            <div className={'relative w-[560px]'}>
                <input
                    type={'text'}
                    className={'border py-2 px-4 w-full h-[42px] mb-2 '}
                    placeholder={'Search for Github username...'}
                    value={value}
                    onInput={onInput}
                />

                {isDropdownOpen && (
                    <div
                        className={'absolute top-[42px] l-0 r-0 max-h-[200px] shadow-md bg-white w-full overflow-y-scroll'}
                        ref={dropdownElement}
                    >
                        {isLoading
                            ? <p className={'text-center py-5'}>Loading...</p>
                            : (<ul className={'list-none'}>
                                {data?.map((user) => (
                                    <li
                                        className={'py-2 border-b px-4 cursor-pointer hover:bg-gray-500 hover:text-white transition-all'}
                                        key={user.id}
                                        onClick={() => clickHandler(user.login)}
                                    >
                                        {user.login}
                                    </li>
                                ))}
                            </ul>)}

                    </div>)
                }

                {repos && (
                    <>
                        <h2 className={'text-center text-lg my-5'}>Repos for: <span className={'font-bold'}>{userName}</span></h2>
                        <ul className={'list-none container'}>
                            {areReposLoading && <li className={'text-center'}>Repos are loading...</li>}
                            {repos.length > 0
                                ? repos.map((repo) => <RepoCard key={repo.id} repo={repo}/>)
                                : <li className={'text-center'}>Nothing found</li>
                            }
                        </ul>
                    </>
                )}

                {isError && <p className={'text-center text-red-600 mt-5 basis-full'}>Something went wrong...</p>}
            </div>
        </div>
    );
}

export default HomePage;
