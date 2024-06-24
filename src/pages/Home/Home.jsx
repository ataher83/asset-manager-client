import { Helmet } from 'react-helmet-async'
import Banner from '../../components/Home/Banner'
import About from '../../components/Home/About'
import Packages from '../../components/Home/Packages'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Asset Manager | Home</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
    </div>
  )
}

export default Home
