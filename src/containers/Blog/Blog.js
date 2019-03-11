import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import './Blog.css';
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent"
// import NewPost from "./NewPost/NewPost"; 

const AsyncNewPost = asyncComponent(()=> { // for lazy loading
    return import("./NewPost/NewPost");
});

class Blog extends Component {
    state = {
        auth: true
    }
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: "#fa923f",
                                        fontWeight: "bold"
                                    }}>Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                pathname: "/new-post",
                                hash: "#submit", // jump to id in route
                                search: "?quick-submit=true" // ex. query params
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch> {/*  Load first route and stop */}
                    {/* Guarding new post if user unauthorized */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}  
                    {/* Loading asynchronously */}
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} /> 
                    {/* Handling unknown routes */}
                    {/* <Route render={() => <h1>Page not found.</h1>} />  */}
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;