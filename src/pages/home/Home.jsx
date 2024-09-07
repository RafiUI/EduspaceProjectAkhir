import React from 'react'
import Banner from '../../components/Banner'
import Corousel from '../../components/Corousel'
import Categori from '../../components/Categori'
import Eduvideo from '../../components/Eduvideo'
import CategoriO from '../../components/CategoriO'


const Home = () => {
    return (
        <div>
            <Banner/>
            <Corousel/>
            <Categori/>
            <Eduvideo/>
            <CategoriO/>
        </div>
    )
}

export default Home