import React, { Component } from 'react'
import { connect } from 'react-redux';
export class Chatbot extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        (function (d, m) {
            var kommunicateSettings =
            {
                "appId": "3bdeffbc8ee77eb81baf0db3ef054961c",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
        /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.currentUserReducer
})

export default connect(mapStateToProps)(Chatbot)