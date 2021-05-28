import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import CalendarView from "./Calendar/Calendar";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
import Templates from "./Templates/Templates";
import CreateTemplate from "./Templates/Create/CreateTemplate";
import EditTemplate from "./Templates/Edit/EditTemplate";

function Navigation(props) {
    return (
        <Router>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Calendar">Calendar</Nav.Link>
                        <Nav.Link as={Link} to="/Add_Form">Add Form</Nav.Link>
                        <Nav.Link as={Link} to="/Search_Form">Search Forms</Nav.Link>
                        <Nav.Link as={Link} to="/Templates">Templates</Nav.Link>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route path="/Calendar">
                        <CalendarView />
                    </Route>
                    <Route path="/Add_Form">
                        <AddForm />
                    </Route>
                    <Route path="/Search_Form">
                        <SearchForm/>
                    </Route>
                    <Route path="/Templates">
                        <Templates />
                    </Route>
                    <Route path="/CreateTemplate">
                        <CreateTemplate />
                    </Route>
                    <Route path="/EditTemplate">
                        <EditTemplate />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Navigation;