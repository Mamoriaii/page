import React from 'react';
import FormSeg from './components/FormSeg';
const _ = require('lodash');
interface Props {
}

const SegForm: React.FC<Props> = () => {
    return (
        <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }} >
            <FormSeg />
        </div>
    )
}
export default SegForm;
