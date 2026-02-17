const { pool } = require('../../backend/src/config/db');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query;
    let params = [];

    if (req.user.role === 'admin') {
      // Admin sees all tasks
      query = 'SELECT tasks.*, users.username as owner FROM tasks JOIN users ON tasks.user_id = users.id';
    } else {
      // User sees only their tasks
      query = 'SELECT * FROM tasks WHERE user_id = $1';
      params = [req.user.id];
    }

    const tasks = await pool.query(query, params);
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Please add a title' });
  }

  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, req.user.id]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    // Check if task exists
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership or admin
    if (task.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTask = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status) WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );

    res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

    res.status(200).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
