import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";

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
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error);
            })
    }

    // for expanding clicked post information in FullPost
    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render() {
        let posts = <p style={{ textAlign: "center", color: "red" }}>Something went wrong.</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            });
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;