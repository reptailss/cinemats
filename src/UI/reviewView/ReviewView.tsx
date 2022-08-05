import React, {FC, memo} from 'react';

import pathImg from '../../utils/pathImg'
import sliceString from '../../utils/sliceString'

import './reviewview.scss'
import plugImg from '../../resources/img/plugimg.png'
import {IReview} from "../../types/reviews";


interface IReviewViewProps {
    data: IReview[]
}


const ReviewView: FC<IReviewViewProps> = memo(({data}) => {


    const reviewItems = data.map((item, i) => {
        const {content, author_details, created_at, updated_at} = item;

        const avatarSlice = author_details?.avatar_path ? author_details.avatar_path.slice(1, author_details.avatar_path.length) : plugImg;
        const createdTime = sliceString(created_at, 10, false);
        const updatedTime = sliceString(updated_at, 10, false);
        const srcImg = author_details?.avatar_path ? (author_details.avatar_path.includes('http') ? avatarSlice : pathImg(author_details.avatar_path)) : plugImg;

        return (

            <div key={i} className="review__item mt-2">
                <img src={srcImg}
                     alt={author_details?.name}
                     className="review__avatar"
                />
                <div className="review__info">
                    <div className="review__inner">
                        <div className="review__name title-2">
                            {author_details?.name}
                        </div>
                        <div className="review__time text">
                            {created_at ? createdTime : `${updatedTime} changed`}
                        </div>
                    </div>

                    <div className="review__message text mt-1">
                        {content}
                    </div>

                </div>
            </div>

        )
    });


    return (
        <>
            <div className="title">{data.length > 0 ? '' : 'no reviews'}</div>
            {reviewItems}
        </>
    );
});

export default ReviewView;