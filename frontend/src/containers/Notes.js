import { API, Storage } from "aws-amplify";
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../lib/errorLib";
import { s3Upload, s3Remove } from "../lib/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

export default function Notes() {
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        function loadNote() {
            console.log(`The id: ${id}`);
            return API.get("notes", `/notes/${id}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveNote(note) {
        return API.put("notes", `/notes/${id}`, {
            body: note
        });
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
            );
            return;
        }

        setIsLoading(true);

        try {
            await deleteAttachment(); // delete an existing attachment

            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveNote({
                content,
                attachment: attachment || note.attachment
            });

            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function deleteNote() {
        return API.del("notes", `/notes/${id}`);
    }

    async function deleteAttachment() {
        let retval = false;
        const { attachment } = note;

        if (attachment) {
            try {
                await s3Remove(attachment);
                console.log(`${attachment} removed!`);
                retval = true;
            } catch (e) {
                onError(e);
            }
        }

        return retval;
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteNote();
            deleteAttachment();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Notes">
            {note && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="content">
                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="file">
                        <Form.Label>Attachment</Form.Label>
                        {note.attachment && (
                            <p>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}
                                >
                                    {formatFilename(note.attachment)}
                                </a>
                            </p>
                        )}
                        <Form.Control onChange={handleFileChange} type="file" />
                    </Form.Group>
                    <LoaderButton
                        block
                        size="lg"
                        type="submit"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        size="lg"
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </Form>
            )}
        </div>
    );
}