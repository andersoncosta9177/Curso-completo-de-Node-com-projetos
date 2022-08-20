const express = require("express")
const router = express.Router()

const TaskController = require("../controllers/TaskContoller")

router.get('/add', TaskController.createTask)
router.post("/add", TaskController.createTaskSave)
router.get('/', TaskController.showTasks)
router.post("/remove", TaskController.removeTask)
router.get("/edit/:id", TaskController.updateTask)
router.post('/updatestatus', TaskController.toggleTaskStatus)
router.post("/edit", TaskController.updateTaskPost);




module.exports  = router