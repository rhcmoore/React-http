import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends React.Component {
    state = {
        posts: [],
        selectedPostId: null,
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("/posts")
            .then(response => {
                // limit response to 4
                const posts = response.data.slice(0, 4);
                // add author property to each (hardcoded for now)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: "Jack"
                    }
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
            })
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: "/posts/" + id}) // programmatic alternative to Link 
        // this.props.history.push("/posts/" + id) // also works
    }

    render() {
        let posts = <p style={{ textAlign: "center", color: "red" }}>Something went wrong.</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={"/posts/" + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    // </Link>
                )
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;