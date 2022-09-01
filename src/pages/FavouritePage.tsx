import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { getFavourites } from '../store/github/github.slice';

function FavouritePage() {
    const favourites = useAppSelector(getFavourites);

    return (
        <>
            <h1 className={'text-center font-bold text-lg mt-5'}>Favourites</h1>
            <div className={'flex justify-center pt-5 mx-auto h-screen flex-wrap'}>
                <ul className={'list-none'}>
                    {favourites.length
                        ? favourites.map(fav => (
                            <li key={fav}>
                                <a href={fav} target={'_blank'} rel="noreferrer">{fav}</a>
                            </li>
                        ))
                        : <li>No repos</li>
                    }
                </ul>
            </div>
        </>
    );
}

export default FavouritePage;
