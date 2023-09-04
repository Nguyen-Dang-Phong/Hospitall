import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";

class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/KaSFoOF6Yw0" title="Nhạc hay để nghe khi đọc sách, nhạc hay để nghe khi học bài, nhạc tăng khả năng tập trung" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>To anybody who's reading this, I pray that whatever is hurting you or whatever you are constantly stressing about gets better. May the dark thoughts, the overthinking, and the doubt exit your mind. May clarity replace confusion. I hope peace and calmness fill your life.</p>
                    </div>

                </div>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
}
const mapDispatchToProps = dispatch => {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(About);