const Task = require('../models/Task');

// Get all tasks for authenticated user
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error('GET ALL TASKS ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single task
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('GET TASK ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = await Task.create({
            title,
            description: description || '',
            status: status || 'pending',
            dueDate: dueDate || null,
            userId: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('CREATE TASK ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update fields if provided
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;
        if (dueDate !== undefined) task.dueDate = dueDate;

        await task.save();

        res.json(task);
    } catch (error) {
        console.error('UPDATE TASK ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('DELETE TASK ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
