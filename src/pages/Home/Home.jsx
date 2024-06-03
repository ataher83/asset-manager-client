import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Rooms from '../../components/Home/Rooms'
import Banner from '../../components/Home/Banner'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Asset Manager | Home</title>
      </Helmet>
      {/* Categories section  */}
      <Categories />
      {/* Rooms section */}
      <Rooms />
      <Banner></Banner>
    </div>
  )
}

export default Home
