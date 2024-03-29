import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Privacy.css';
import { updatePreferences } from '../../actions';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';

const Privacy = () => {
    const history = useHistory();
    const [productCheck, setProductCheck] = useState(false);
    const [otherCheck, setOtherCheck] = useState(false);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updatePreferences({ mainProduct: productCheck, other: otherCheck }));
        history.replace('/done');
    }

    return (
        <>
            <form onSubmit={handleSubmit} data-testid="user-preferences">
                <div className="form-check">
                    <input
                        type="checkbox"
                        onChange={() => setProductCheck(!productCheck)}
                        data-testid="form-checkbox"
                    />
                    <label>Receive updates about the Tray.io product by email</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        onChange={() => setOtherCheck(!otherCheck)}
                        data-testid="form-checkbox"
                    />
                    <label>
                        Receive communcation by email for other products created by the Tray.io team
                    </label>
                </div>
                <div className="page-footer">
                    <Button type="submit" label="Next" />
                </div>
            </form>
        </>
    );
};

export default Privacy;
