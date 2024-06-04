import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Rooms from '../../components/Home/Rooms'
import Banner from '../../components/Home/Banner'
import About from '../../components/Home/About'
import Packages from '../../components/Home/Packages'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Asset Manager | Home</title>
      </Helmet>
      {/* Categories section  */}
      {/* <Categories /> */}
      {/* Rooms section */}
      {/* <Rooms /> */}
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
    </div>
  )
}

export default Home
