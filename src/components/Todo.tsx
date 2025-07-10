import DeleteIcon from '@mui/icons-material/Delete';
import {
    Alert,
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
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// GraphQL operations
const createTodoMutation = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    content
    isDone
    priority
    createdAt
  }
}`;

const listTodosQuery = `query ListTodos {
  listTodos {
    items {
      id
      content
      isDone
      priority
      createdAt
    }
  }
}`;

const updateTodoMutation = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    isDone
  }
}`;

const deleteTodoMutation = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
  }
}`;

interface Todo {
  id: string;
  content: string;
  isDone: boolean;
  priority: string;
  createdAt: string;
}

// Simple function to make GraphQL requests
async function executeGraphQL(query: string, variables?: any) {
  const config = window.AMPLIFY_CONFIG;
  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const result = await response.json();
  console.log('GraphQL result:', result);
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result;
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('low');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching todos...");
      
      const result = await executeGraphQL(listTodosQuery);
      console.log("Todo data received:", result);
      
      if (result.data?.listTodos?.items) {
        setTodos(result.data.listTodos.items);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const todoInput = {
        content: content.trim(),
        isDone: false,
        priority,
        createdAt: new Date().toISOString()
      };
      
      console.log("Creating todo:", todoInput);
      
      const result = await executeGraphQL(createTodoMutation, { input: todoInput });
      console.log("Todo created successfully:", result);
      
      setContent('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Failed to create todo: ' + (error instanceof Error ? error.message : String(error)));
      setLoading(false);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      setLoading(true);
      setError(null);
      
      const updateInput = {
        id: todo.id,
        isDone: !todo.isDone
      };
      
      await executeGraphQL(updateTodoMutation, { input: updateInput });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo: ' + (error instanceof Error ? error.message : String(error)));
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await executeGraphQL(deleteTodoMutation, { input: { id } });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo: ' + (error instanceof Error ? error.message : String(error)));
      setLoading(false);
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box>
      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

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
            disabled={!content.trim() || loading}
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
            {loading ? 'Adding...' : 'Add Todo'}
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
          Todo List {loading && '(Loading...)'}
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
          {todos.length === 0 && !loading && (
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