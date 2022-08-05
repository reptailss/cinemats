import React, {FC, memo} from 'react';

import {IActor} from "../../types/actors";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import pathImg from '../../utils/pathImg'
import sliceString from "../../utils/sliceString"

import PlugImg from '../../resources/img/plugimg.png'
import style from './itemActor.module.scss'

const ItemActor: FC<IActor> = memo(({name, profile_path, character, id}) => {


    const imgActor = profile_path ? pathImg(profile_path) : PlugImg;
    const titleActor = name ? sliceString(name, 20) : 'нет имени'

    return (
        <Card
            className={style.card}
        >
            <CardMedia
                className={style.img}
                component="img"
                image={imgActor}
                alt={titleActor}
            />
            <CardContent>
                <Typography gutterBottom
                            component="div"
                            className={style.typography}
                >
                    {titleActor}
                </Typography>
            </CardContent>
        </Card>

    );
});

export default ItemActor;

