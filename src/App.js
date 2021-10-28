import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import TopBar from "./components/TopBar"
import CommunityView from './components/views/CommunityView'
import AllCommunityOverview from './components/views/AllCommunityOverview'
import { motion } from "framer-motion"


const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
        <TopBar />
          <Switch>
            <Route path="/community/:comm_id">
              <CommunityView />
            </Route>
            <Route>
              <AllCommunityOverview path="/" />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
