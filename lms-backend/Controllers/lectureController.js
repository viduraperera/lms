import express from "express";
import Lecture from "../Models/Lecture.js";
import Module from "../Models/Module.js";

const router = express.Router();

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({});
    return res.status(200).send(lectures);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById({ _id: req.params.id });
    if (!lecture) return res.status(404).send("Lecture not found");
    return res.status(200).send(lecture);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createLecture = async (req, res) => {
  try {
    const { module_code } = req.body;
    const checkModule = await Module.findOne({ module_code });
    if (!checkModule) return res.status(404).send("Module does not exits");
    const lecture = new Lecture({ ...req.body });
    lecture.save((error, savedLecture) => {
      if (error) return res.status(400).send(error);
      return res.status(201).send(savedLecture);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findOne({ _id: req.params.id });
    if (!lecture) return res.status(404).send("Lecture does not exits");

    const { module_code } = req.body;
    const checkModule = await Module.findOne({ module_code });
    if (!checkModule) return res.status(404).send("Module does not exits");
    await Lecture.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Lecture updated");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findOne({ _id: req.params.id });
    if (!lecture) return res.status(404).send("Lecture does not exits");
    await Lecture.deleteOne({ _id: req.params.id }, (error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Lecture deleted");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default router;
