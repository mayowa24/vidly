import React from 'react';
// class Like extends Component {

const Like = props => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o"
    return (<React.Fragment>
        <i className={classes}
            onClick={props.onClick}
            style={{ cursor: 'pointer' }} aria-hidden="false"></i>
    </React.Fragment>
    );
}
// }

export default Like;
    // render() {
    //     let classes = "fa fa-heart";
    //     if (!this.props.liked) classes += "-o"
    //     return (<React.Fragment>
    //         <i className={classes}
    //             onClick={this.props.onClick}
    //             style={{ cursor: 'pointer' }} aria-hidden="false"></i>
    //     </React.Fragment>
    //     );
    // }
// }

// export default Like;