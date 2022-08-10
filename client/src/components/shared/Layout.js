import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  return (
  <div>
    <h1>Items App</h1>
    <Nav />
    
    {props.children} {/* refer to Home.js; h4 tag is the children of Layout tag */}

    <Footer />
  </div>
  )
}

export default Layout