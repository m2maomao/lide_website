import { HashRouter, Route, Switch } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { withTranslation } from 'react-i18next'
import { Navbars, Footer } from 'com/index'
import {
  Home, Welcome, Search, News, Responsibility, Contact, Products,
} from 'con/index'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: 'zh',
    }
    this.handleEmitLanguage = this.handleEmitLanguage.bind(this)
  }

  handleEmitLanguage(lng) {
    this.setState({ lng })
  }

  render() {
    const { props } = this
    const { lng } = this.state
    return (
      <HashRouter>
        <Container fluid>
          <Row>
            <Navbars {...props} emitLanguage={this.handleEmitLanguage} />
          </Row>
          <Switch>
            <Route
              exact
              path="/"
              render={(prop) => <Home lng={lng} {...prop} {...props} />}
            />
            <Route path="/welcome" render={(prop) => <Welcome {...props} />} />
            <Route path="/search/:keyword" render={(prop) => <Search {...props} />} />
            <Route path="/search" render={(prop) => <Search {...props} />} />
            <Route path="/news" render={(prop) => <News {...props} />} />
            <Route path="/responsibility" render={(prop) => <Responsibility {...props} />} />
            <Route path="/contact" render={(prop) => <Contact {...props} />} />
            <Route path="/products" render={(prop) => <Products {...props} />} />

          </Switch>
          <Footer {...props} />
          <Row className="bottom-line" />
        </Container>
      </HashRouter>
    )
  }
}

export default withTranslation('translations')(App)
