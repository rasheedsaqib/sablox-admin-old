import {useEffect, useRef, useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorState from "draft-js/lib/EditorState";

const PostDescription = () => {
    let editor = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        console.log(editorState);
    }, [editorState]);

    return (
        <div className="App">
            <Editor
                ref={el => editor = el}
                editorState={editorState}
                onEditorStateChange={state => setEditorState(state)}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    )
}

export default PostDescription;