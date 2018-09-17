import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { eggType } from '../types';

const EggBox = ({ egg, eggId, chickenName, onDelete }) => (
  <div className="box is-radiusless">
    <div className="media">
      <div className="media-left">
        <Link className="image is-32x32" to={`/eggs/edit/${eggId}`}>
          <img src="/assets/images/egg-icon.png" alt="egg-icon" />
        </Link>
      </div>
      <div className="media-content">
        <div className="columns is-mobile">
          <div className="column is-four-fifths is-clipped">
            {egg.chickenId !== 'unknown' &&
              <Link
                className="is-size-6"
                to={`/chicken/${egg.chickenId}`}
              >
                { chickenName }
              </Link>
            }
            {egg.chickenId === 'unknown' &&
              <p className="is-size-6">{ chickenName }</p>
            }
            <p className={`is-size-6 ${egg.weight ? '' : 'has-text-grey-light'}`}>
              { egg.weight ? egg.weight : '-- ' }g
            </p>
          </div>

          <div className="column edit-icon">
            <Link className="button is-white is-pulled-right" to={`/eggs/edit/${eggId}`}>
              <span className="icon">
                <i className="fa fa-pencil" />
              </span>
            </Link>
          </div>
        </div>

      </div>
      <div className="media-right">
        <button className="button is-white" onClick={onDelete}>
          <span className="icon trash">
            <i className="fa fa-trash-o" />
          </span>
        </button>
      </div>
    </div>
    <div className="egg-info">
      {egg.damaged &&
        <div className="columns is-variable is-1 is-mobile">
          <div className="column is-1 is-offset-1">
            <span className="icon has-text-danger is-pulled-right">
              <i className="fa fa-warning" />
            </span>
          </div>
          <div className="column">This egg was damaged</div>
        </div>
      }
      {egg.notes &&
        <div className="columns is-variable is-1 is-mobile">
          <div className="column is-1 is-offset-1">
            <span className="icon is-pulled-right">
              <i className="fa fa-sticky-note-o" />
            </span>
          </div>
          <div className="column">
            <em>&quot;{ egg.notes }&quot;</em>
          </div>
        </div>
      }
    </div>
  </div>
);

EggBox.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // eslint-disable-next-line react/no-typos
  egg: eggType.isRequired,
  eggId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EggBox;
