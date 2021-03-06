import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { message, Tooltip, Button, Popconfirm, Input } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import {
  getTasks,
  createTask,
  updateTodo,
  removeTask,
} from "../../actions/todo";

import "./todoList.css";
import Popup from "../Common/Popup";
import TodoImage from "../../Images/todo.png";

let option_filter = [];

const TodoList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

  const [filterTodo, setFilterTodo] = useState([]);

  //dispatching the getTask action
  useEffect(() => {
    setLoading(true);
    dispatch(getTasks());
  }, [dispatch]);

  //calling the reducer
  const todoData = useSelector((state) => state.TaskReducer.task);

  //getting the current user of the application from the local storage
  const [user, setUser] = useState();

  //filtering the todo list for the current user
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.payload.user);
    option_filter = todoData?.filter((todo) => {
      return (
        todo.CreatedBy?._id ===
        JSON.parse(localStorage.getItem("profile"))?.payload.user?._id
      );
    });

    if (option_filter?.length > 0) {
      const todoFilter = {
        todo: {
          title: "Todo",
          items: option_filter[0]?.todo?.items,
        },
        in_progress: {
          title: "In Progress",
          items: option_filter[0]?.in_progress?.items,
        },
        done: {
          title: "Completed",
          items: option_filter[0]?.done?.items,
        },
      };
      setTodoId(option_filter[0]?._id);
      setState(todoFilter);
    }
  }, [todoData]);

  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      items: [],
    },
    in_progress: {
      items: [],
    },
    done: {
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      // Remove from previous items array

      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          items: [
            ...prev.todo.items,
            {
              id: v4(),
              name: text,
            },
          ],
        },
      };
    });

    setText("");
  };

  const save = async () => {
    let todo = {
      ...state,
      CreatedBy: user._id,
    };
    if (todoId) {
      todo = {
        ...todo,
        _id: todoId,
      };
      // Patch
      const res = await dispatch(updateTodo(todo));
      if (res.status === 200) {
        message.success("Saving All tasks");
      }
    } else {
      // create
      const res = await dispatch(createTask(todo));
      if (res.status === 200) {
        message.success("Saving All tasks");
      }
    }
  };

  //preventing or asking the user before refreshing/going back to a page
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const deleteConfirm = async (e) => {
    const todos = state?.todo?.items?.filter((todo) => todo.id !== e);
    const inProgress = state?.in_progress?.items?.filter(
      (todo) => todo.id !== e
    );
    const done = state?.done?.items?.filter((todo) => todo.id !== e);
    setState({
      todo: {
        items: todos,
      },
      in_progress: {
        items: inProgress,
      },
      done: {
        items: done,
      },
    });
  };

  return (
    <div>
      <div className={"headerDiv"}>
        <div className={"headerDescription"}>
          <h3 className={"headerTitle"}>Todo List</h3>
        </div>
        <div className={"imageDiv"}>
          <img className={"imageStyle"} src={TodoImage} alt="TodoImage" />
        </div>
      </div>
      <div className={"todo"}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items?.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="delete">
                                      {el.name}
                                      <div className="deleteIcon">
                                        <Popconfirm
                                          className="deleteIcon"
                                          title="Are you sure to delete this Module?"
                                          onConfirm={() => deleteConfirm(el.id)}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <Tooltip title="Delete Module">
                                            <DeleteFilled />
                                          </Tooltip>
                                        </Popconfirm>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
        <Tooltip title="Create New Module">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="fabBtn"
            style={{ position: "fixed" }}
            onClick={() => setButtonPopup(true)}
          />
        </Tooltip>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div>
            <Input
              className="add-todo"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Popup>
      </div>
      <div className="save-btn-div">
        <button className="save-btn" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TodoList;
