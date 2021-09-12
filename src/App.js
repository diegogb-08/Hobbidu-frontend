// React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// State Management
import { connect } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './react-query/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

// Custom Components
import ChangeEmail from './pages/ChangeEmail/ChangeEmail'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CheckUser from './pages/User/UserCheck'
import EditAccount from './pages/EditAccount/EditAccount'
import Event from './pages/Event/Event'
import EventView from './pages/EventView/EventView'
import Header from './pages/Header/Header'
import Home from './pages/Home/Home'
import Landing from './pages/Landing/Landing'
import User from './pages/User/User'

function App({ user, checkUser, event }) {
  const userPath = user?.user_name

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" exact component={Home} />
            <Route path={`/${userPath}`} exact component={User} />
            <Route path="/account/edit" exact component={EditAccount} />
            <Route path="/change_password" exact component={ChangePassword} />
            <Route path="/change_email" exact component={ChangeEmail} />
            <Route path="/events" exact component={EventView} />
            <Route path={`/event/${event?._id}`} exact component={Event} />
            <Route
              path={`/${checkUser?.user_name}`}
              exact
              component={CheckUser}
            />
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    event: state.eventReducer.event,
    checkUser: state.userReducer.checkUser,
  }
}

export default connect(mapStateToProps)(App)
