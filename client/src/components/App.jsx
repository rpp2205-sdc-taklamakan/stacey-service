import React from 'react';
import Overview from './overview/Overview.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import Outfit from './relatedItems/Outfit.jsx';
import QA from './qa/QA.jsx';
import Reviews from './reviews/Reviews.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
    this.reviewsRef = React.createRef();
  }


  componentDidMount() {
    axios.get('/products')
      .then(res => {
        this.setState({
          product: res.data[0]
        })
      })
  }

  handleScrollToReviews(event) {
    window.scrollTo(0, this.reviewsRef.current.offsetTop);
  }


  render() {
    if (JSON.stringify(this.state.product) !=='{}') {
      return (
        <div className='container'>
          <Overview product={this.state.product} handleScrollToReviews={this.handleScrollToReviews.bind(this)} />
          <RelatedItems product={this.state.product}/> 
          <Outfit product={this.state.product}/>
          <QA product={this.state.product}/>
          <Reviews product={this.state.product} scrollToReviews={this.reviewsRef}/>
        </div>
      )
    } else {
      return null;
    }

  }
}

export default App;
