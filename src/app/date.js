import React from 'react'

import { DatePickerInput } from 'rc-datepicker';

export default ({ name, value, onChange }) => (
    <DatePickerInput
        onChange={(v) => {
            onChange(this, { name: name, value: v })
        }}
        value={value}
        name={name}
        format='DD/MM/YYYY'
        locale="pt-br"
        showOnInputClick={true}
    />
)