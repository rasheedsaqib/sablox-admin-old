import {useRef, useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorState from "draft-js/lib/EditorState";
import {stateToHTML} from "draft-js-export-html";

const PostDescription = props => {
    let editor = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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