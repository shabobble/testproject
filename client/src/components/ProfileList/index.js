import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ drinks, title }) => {
  if (!drinks.length) {
    return <h3>No Drinks Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {drinks &&
          drinks.map((drink) => (
            <div key={drink._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {drink.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {drink.name ? drink.ingredients.length : 0}{' '}
                    ingredients
                    {drink.name && drink.name.length === 1 ? '' : 's'}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/drinks/${drink._id}`}
                >
                  View and endorse their skills.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;