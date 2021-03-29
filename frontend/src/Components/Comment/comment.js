import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Comment(props) {
    const {description, reviewer_email} = props.comment;
    const flag = reviewer_email === props.user;
    function onDelete(e) {
        props.onDelete(e, props.prop);
    }
    return (
        // <div>HIIII</div>
        <div className="media mb-3">
            <div className="media-body p-2 shadow-sm rounded bg-light border">
                {/* <small className="float-right text-muted">{time}</small> */}
                <h6 className="mt-0 mb-1 text-muted">{reviewer_email}</h6>
                {description}
                {flag ? (
                    <button
                        className="btn btn-danger"
                        style={{marginLeft: '1000px'}}
                        id={props.comment.id}
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
