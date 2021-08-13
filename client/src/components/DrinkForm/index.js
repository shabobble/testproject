import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_DRINK } from '../../utils/mutations';

import Auth from '../../utils/auth';

const DrinkForm = ({ profileId }) => {
    const [drink, setDrink] = useState('');

    const [addDrink, { error }] = useMutation(ADD_DRINK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addDrink({
                variables: { profileId, drink },
            });

            setDrink('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4>Endorse some more drinks below.</h4>

            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Endorse some drinks..."
                            value={drink}
                            className="form-input w-100"
                            onChange={(event) => setDrink(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-info btn-block py-3" type="submit">
                            Endorse Drink
                        </button>
                    </div>
                    {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                            {error.message}
                        </div>
                    )}
                </form>
            ): (
                <p>
                    You need to be logged in to endorse drinks. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default DrinkForm;