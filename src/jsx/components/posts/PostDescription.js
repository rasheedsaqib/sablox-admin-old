import {useEffect, useRef, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorState from "draft-js/lib/EditorState";
import {stateToHTML} from "draft-js-export-html";
import {convertFromHTML} from "draft-convert";
import axios from "../../../services/axios";

const PostDescription = props => {
    let editor = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if(props.id){
            axios.get('/post/' + props.id)
                .then(res => {
                    setEditorState(EditorState.createWithContent(convertFromHTML(res.data.description)));
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [props.id]);

    const handleChange = state => {
        setEditorState(state);
        props.setDescription(stateToHTML(state.getCurrentContent()));
    };

    return (
        <div className="App">
            <Editor
                ref={el => editor = el}
                editorState={editorState}
                onEditorStateChange={handleChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    )
}

export default PostDescription;