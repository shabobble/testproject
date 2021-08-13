import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_DRINK } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const DrinksList = ({ drinks, isLoggedInUser = false }) => {
    const [removeDrink, { error }] = useMutation(REMOVE_DRINK, {
        update(cache, { data: { removeDrink } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeDrink },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveDrink = async (drink) => {
        try {
            const { data } = await removeDrink({
                variables: { drink },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!drinks.length) {
        return <h3>No Drinks Yet</h3>;
    }

    return (
        <div>
            <div className="flex-row justify-space-between my-4">
                {drinks &&
                    drinks.map((drink) => (
                        <div key={drink} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                                    <span>{drink}</span>
                                    {isLoggedInUser && (
                                        <button
                                            className="btn btn-sm btn-danger ml-auto"
                                            onClick={() => handleRemoveDrink(drink)}
                                        >
                                            X
                                        </button>
                                    )}
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
        </div>
    );
};

export default DrinksList;