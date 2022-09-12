import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ProjectPage from "./projects/ProjectsPage";
// eslint-disable-next-line import/no-named-as-default
import ManageProjectPage from "./projects/ManageProjectPage"; 
// eslint-disable-next-line import/no-named-as-default
import ManageBidPage  from "./projects/ManageBidPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/projects" component={ProjectPage} />
        <Route path="/project/:slug" component={ManageProjectPage} />
        <Route path="/project" component={ManageProjectPage} />
        <Route path="/bid-to-project/:slug" component={ManageBidPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
