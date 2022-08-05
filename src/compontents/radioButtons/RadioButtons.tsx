import * as React from 'react';
import {FC,memo} from 'react';

import {IRadioButton} from "../../types/button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import './radioButtons.scss'

interface IRadioButtons {
    data: IRadioButton[],
    group: string,
    row: boolean,
    title: string,
    styleInner: {}
}

const RadioButtons: FC<IRadioButtons> = memo(
    ({data, group, row, title, styleInner}) => {


        const buttons = data.map(({value, name, checkedValue, onChangeInput}) => {

            const checkedInput = checkedValue === value;
            return (

                <FormControlLabel
                    sx={{
                        color: '#ffffff',
                        '&.Mui-checked': {
                            color: 'black',
                        },
                    }}
                    checked={checkedInput}
                    key={value}
                    onChange={onChangeInput}
                    value={value}
                    control={<Radio/>}
                    label={name}
                    className={'radio__item'}
                />
            )
        });

        return (
            <FormControl
                style={styleInner}
                className={'form-control__inner'}>
                <FormLabel className={'form-control__label radio__title'} sx={{
                    color: '#ffffff',
                    '&.Mui-checked': {
                        color: 'red',
                    },
                }}>{title}</FormLabel>
                <RadioGroup
                    sx={{
                        color: '#ffffff',
                        '&.Mui-checked': {
                            color: 'red',
                        },
                    }}
                    row={row}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={group}
                >
                    {buttons}
                </RadioGroup>
            </FormControl>
        )
    }
);

export default RadioButtons;