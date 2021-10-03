import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Privacy.css';
import { updatePreferences } from '../../actions';
import { useDispatch } from 'react-redux';

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
            <form onSubmit={handleSubmit}>
                <div className="form-check">
                    <input type="checkbox" onChange={() => setProductCheck(!productCheck)} />
                    <label>Receive updates about the Tray.io product by email</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" onChange={() => setOtherCheck(!otherCheck)} />
                    <label>
                        Receive communcation by email for other products created by the Tray.io team
                    </label>
                </div>
                <div className="btn-container">
                    <button type="submit">Next</button>
                </div>
            </form>
        </>
    );
};

export default Privacy;
