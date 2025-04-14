import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { type Schema } from '../../amplify/data/resource';
const client = generateClient<Schema>();

interface Todo {
  id: string;
  content: string;
  isDone: boolean;
  priority: string;
  createdAt: string;
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('low');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await client.models.Todo.list();
      setTodos(todoData.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await client.models.Todo.create({
        content: content.trim(),
        isDone: false,
        priority,
        createdAt: new Date().toISOString(),
      });
      setContent('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      await client.models.Todo.update({
        id: todo.id,
        isDone: !todo.isDone,
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  return (
    <Box>
      {/* Add New Todo Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #e0e7ff'
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Add New Todo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Todo Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                }
              }}
            />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={priority}
                onChange={handlePriorityChange}
                displayEmpty
                sx={{ borderRadius: 1.5 }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!content.trim()}
            sx={{
              py: 1,
              borderRadius: 1.5,
              textTransform: 'none',
              bgcolor: '#1976d2',
              '&:hover': {
                bgcolor: '#1565c0'
              }
            }}
          >
            Add Todo
          </Button>
        </form>
      </Paper>

      {/* Todo List Section */}
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: 2,
          bgcolor: 'white',
          border: '1px solid #e0e7ff',
          overflow: 'hidden'
        }}
      >
        <Typography variant="h6" sx={{ p: 3, pb: 2, fontWeight: 600 }}>
          Todo List
        </Typography>
        <List sx={{ p: 0 }}>
          {todos.map((todo, index) => (
            <ListItem
              key={todo.id}
              sx={{
                borderTop: index > 0 ? '1px solid #e0e7ff' : 'none',
                '&:hover': {
                  bgcolor: '#f8fafc'
                }
              }}
            >
              <Checkbox
                checked={todo.isDone}
                onChange={() => handleToggleTodo(todo)}
                color="primary"
                sx={{ mr: 1 }}
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: todo.isDone ? 'line-through' : 'none',
                      color: todo.isDone ? 'text.secondary' : 'text.primary'
                    }}
                  >
                    {todo.content}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: 
                        todo.priority === 'high' ? 'error.main' :
                        todo.priority === 'medium' ? 'warning.main' :
                        'success.main'
                    }}
                  >
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{ color: 'text.secondary' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {todos.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.secondary" align="center">
                    No todos yet. Add your first todo above!
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default TodoComponent; 