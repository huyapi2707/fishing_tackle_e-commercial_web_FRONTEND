import Header from '../../components/header';
import Footer from '../../components/footer';
import Banner from '../../components/banner';
import ProductGrid from '../../components/productGird';
import ScrollTop from '../../components/scrollTop';
import React from 'react';
import { useGlobalContext, actions } from '../../store';
function MainPage() {
    const [state, dispatch] = useGlobalContext();
    function pageRendered() {
        switch (state.page.type) {
            case 'product': {
                return <ProductGrid />;
            }
        }
    }
    return (
        <React.Fragment>
            <Header />
            <Banner />
            {pageRendered()}
            <ScrollTop></ScrollTop>
            <Footer />
        </React.Fragment>
    );
}

export default MainPage;
