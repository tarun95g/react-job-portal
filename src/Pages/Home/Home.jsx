import { createSearchParams, useNavigate } from "react-router-dom";
import BannerWithSearch from "../../Components/BannerWithSearch/BannerWithSearch";
import BaseLayout from "../../Components/BaseLayout/BaseLayout";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Seo from "../../Components/Seo/Seo";
import JobSearchContext from "../../Contexts/JobSearchContext/JobSearchContext";
import useTranslationContext from "../../Contexts/Translation/useTranslationContext";
import { ROUTES } from "../../Routes/routes";
import styles from './Home.module.scss'
import { useState } from "react";
import { fakeDelay } from "../../api/service";

const Home = () => {
        const navigate = useNavigate();
        const { t } = useTranslationContext();
        const [isLoading, setIsLoading] = useState(false)

        const onSearch = async (params) => {
                setIsLoading(true);
                await fakeDelay(2000);

                navigate({
                        pathname: ROUTES.JOBS,
                        search: createSearchParams(params).toString()
                })
        }

        return (
                <BaseLayout
                        header={<Header />}
                        footer={<Footer />}
                        seo={<Seo title='Home' />}
                >
                        <JobSearchContext value={{ onSearch, isLoading, params: {} }}>
                                <section className={styles.searchWrapper}>
                                        <BannerWithSearch title={t('home_banner')} />
                                </section>
                        </JobSearchContext>
                </BaseLayout>
        )
};

export default Home;
