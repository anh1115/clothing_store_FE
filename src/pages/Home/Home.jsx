import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.scss';
import Banner from '../../components/Banner/Banner';
import Category from '../../components/Category/Category';
import ProductNew from '../../components/ProductNew/ProductNew';
import TopSale from '../../components/TopSale/TopSale';
import { Link } from 'react-router-dom';
import Policy from '../../components/Policy/Policy';

const Home = () => {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    return(
        <div className="container">
            <Helmet>
                <title>Trang Chủ - {appName}</title>
            </Helmet>
            <section className='my-2'><Banner/></section>
            <section className='my-5'><Category/></section>
            <section className='my-5'>
                <ProductNew/>
            </section>
            <section className='my-5'>
                <TopSale/>
                <div className={`text-center ${styles['read-more']}`}><Link to={'/'}>Xem thêm</Link></div>
            </section>
            <section><Policy/></section>
        </div>
    );
}
export default Home;