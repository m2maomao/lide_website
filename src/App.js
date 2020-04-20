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
            <Route path="/welcome" component={Welcome} />
            <Route path="/search" component={Search} />
            <Route path="/news" component={News} />
            <Route path="/responsibility" component={Responsibility} />
            <Route path="/contact" component={Contact} />
            <Route path="/products" component={Products} />

          </Switch>
          <Footer {...props} />
          <Row className="bottom-line" />
        </Container>
      </HashRouter>
    )
  }
}

export default withTranslation('translations')(App)
