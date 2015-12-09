﻿//tutorial link
//http://reactjs.net/getting-started/tutorial.html
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

var data = [
  { Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
  { Author: "Pete Hunt", Text: "This is one comment" },
  { Author: "Jordan Walke", Text: "This is *another* comment" }
];

console.log(data);

var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentWillMount: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    render: function () {
        return (
            <div className="commentBox">
                    <h1>Comments</h1>
                    <CommentList data={this.state.data} />
                    <CommentForm />
                </div>
        );
    }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.Author}>
          {comment.Text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
          Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
      var converter = new Showdown.converter();
      var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
            {this.props.author}
        </h2>
          {this.props.children}
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

ReactDOM.render(
    <CommentBox url="/comments" />,
    document.getElementById('content')
);