import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import CalendarView from "./Calendar";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
import Analytics from "./Analytics";

function Navigation(props) {
    return (
        <Router>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Calendar">Calendar</Nav.Link>
                        <Nav.Link as={Link} to="/Add_Form">Add Form</Nav.Link>
                        <Nav.Link as={Link} to="/Search_Form">Search Forms</Nav.Link>
                        <Nav.Link as={Link} to="/Analytics">Analytics</Nav.Link>
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
                    <Route path="/Analytics">
                        <Analytics/>
                    </Route>
                    <Route path="/Home">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Navigation;
