import React, {FC, memo} from 'react';
import {Link, useLocation} from 'react-router-dom'

import {Container} from "react-bootstrap"

import './header.scss'

import Logo from '../../resources/icons/logo/Logo'
import SearchInput from "../../compontents/searchInput/SearchInput"
import UserSidebar from "../../compontents/userSidebar/UserSidebar";


const Header: FC = memo(() => {

    const location = useLocation();
    const searchLocation = (location.pathname === '/search');
    const searchLocationNew = (location.pathname === '/list/new');
    // const searchBlock = !searchLocation || !searchLocationNew ? <SearchInput/> : null;
    const searchBlock = searchLocation || searchLocationNew ? null : <SearchInput/>;

    const classSearch = searchLocation ? 'header__search searchPage' : 'header__search';

    return (
        <header className={'header'}>
            <Container>
                <div className='header__inner'>
                    <div className='header__wrapper'>
                        <Link to="/"
                              className={'header__logo-wrap'}>
                            <div className="header__logo">
                                <Logo className='logo'/>
                            </div>
                            <div className="header__title">
                                Cinema.ua
                            </div>
                        </Link>
                        <Link to='/filters'
                              className={'header__menu-item'}>
                            Movies
                        </Link>
                    </div>
                    <div className={'header__menu'}>
                        <div className={classSearch}>
                            {searchBlock}
                        </div>
                        <UserSidebar/>
                    </div>
                </div>
            </Container>
        </header>


    )

});

export default Header;