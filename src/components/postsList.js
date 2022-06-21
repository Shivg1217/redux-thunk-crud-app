import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {fetchList, deletePost, createPost, updatePost} from "../redux/actions/actions";

const PostList = () => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.crudReducer.postData);
  const [type, setType] = useState("add");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    fetchList(dispatch, "posts");
  }, []);

  const delPost = async (id) => {
    await deletePost(dispatch, { id: id });
  };

  const editOpenModal = (val) => {
    setModalOpen(true);
    setBody(val.body);
    setTitle(val.title);
    setEditId(val.id);
    setType("update");
  };

  const addUpdate = async () => {
    let res = false;
    if (type === "add") {
      res = await createPost(dispatch, {
        title: title,
        body: body,
      });
    } else {
      res = await updatePost(dispatch, {
        title: title,
        body: body,
        id: editId,
      });
    }

    if (res) {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setBody("");
    setTitle("");
    setEditId("");
    setType("add");
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between ">
        <h4>Post Lists</h4>
        <Button
          variant="success m-2"
          onClick={() => {
            setType("add");
            setModalOpen(true);
          }}
        >
          Add Post
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {postData.length > 0 ? (
            postData?.map((val, idx) => {
              return (
                <tr key={idx}>
                  <td>{val.title}</td>
                  <td>{val.body}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="success m-2"
                        onClick={() => editOpenModal(val)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger m-2"
                        onClick={() => {
                          delPost(val.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={3}>
                <h4>No Data Found</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal centered show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{type === "add" ? "Add" : "Update"} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title here..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Body here..."
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addUpdate}
            disabled={body && title ? false : true}
          >
            {type === "add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostList;
